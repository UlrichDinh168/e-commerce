/**
 * Configure redux store
 *
 * @author name <name@vertics.co>
 *
 * @copyright Vertics Co 2019
 */

import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import { routerMiddleware } from 'connected-react-router'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import { createLogger } from 'redux-logger'
import index, { history } from './reducers'
import { PERSIST_KEY } from './constants'
import { parse, stringify } from 'flatted'
// actions
import { userActions, loginActions } from 'actions'
import { localStorageUtils } from 'utils'
import { apiSentryReport } from 'helpers/api'

// Create client alias
// Used in action creators
const client = axios.create({
	baseURL:
		process.env.BACKEND_BASE_URL ||
		'https://development-backend-dot-vmit-300709.ey.r.appspot.com',
	responseType: 'json'
})
// Axios interceptor configs
const options = {
	returnRejectedPromiseOnError: true,
	interceptors: {
		request: [
			async ({}, config) => {
				// Add authentication tokens to request header
				const { access } = store.getState().user
				if (access) {
					config.headers.authorization = `Bearer ${access}`
				}
				return config
			}
		],
		response: [
			{
				success: ({}, response) => {
					return response
				},
				error: async ({}, error) => {
					const { data, config, status } = error.response

					apiSentryReport(
						data ? data.code : null,
						data ? data.message : '',
						config.reduxSourceAction.type
					)
					const refreshToken = store.getState().user.refresh
					if ((status === 401 && data.code === 1013) || data.code === 1011) {
						localStorageUtils.removeTokens()
						return store.dispatch(loginActions.localLogout())
					}
					if (status === 401 && data.code === 1012) {
						try {
							const res = await store.dispatch(
								userActions.getNewAccessToken({ refresh: refreshToken })
							)

							if (res) {
								// New request with new token
								config.headers[
									'authorization'
								] = `Bearer ${res.payload.data.access}`
								return new Promise((resolve, reject) => {
									axios
										.request(config)
										.then(response => {
											resolve(response)
										})
										.catch(error => {
											reject(error)
										})
								})
							}
						} catch (e) {}
					}

					return Promise.reject(error)
				}
			}
		]
	}
}
const transformCircular = createTransform(
	(inboundState, key) => stringify(inboundState),
	(outboundState, key) => parse(outboundState)
)
// Config redux-persist
const persistConfig = {
	key: PERSIST_KEY,
	storage,
	blacklist: ['router'],
	transforms: [transformCircular]
}
const persistedReducer = persistReducer(persistConfig, index)

// Define middleware to use
const middleware = [
	thunk,
	routerMiddleware(history),
	axiosMiddleware(client, options)
]
const isProduction = process.env.NODE_ENV === 'production'
if (!isProduction) {
	const logger = createLogger()
	middleware.push(logger)
}

const tools = [applyMiddleware(...middleware)]
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
	tools.push(window.__REDUX_DEVTOOLS_EXTENSION__())
}

// Create redux store
const store = createStore(persistedReducer, compose(...tools))
const persistor = persistStore(store)

export { store, persistor }

/**
 * form utils
 *
 * @author Anh Tu Le <anh.le@vertics.co>
 *
 * @copyright Vertics Oy 2021
 */
import React from 'react'
// utils
import slug from 'slug'
// constanst
import { regexOptions } from '../../src/constants'
// components
import Input from '../../src/shared/components/Input'
import Checkbox from '../../src/shared/components/Checkbox'
import Select from '../../src/shared/components/Select'
import DatePicker from '../../src/shared/components/DatePicker'
import RichText from '../../src/shared/components/RichText'
import { Controller } from 'react-hook-form'
import { Draggable } from 'react-beautiful-dnd'
import { convertToRaw, convertFromRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

const withControl = (component, onDelete, canDrag) => {
	return (
		<div className='with-control'>
			<div className='children'>{component}</div>
			<div className='control'>
				{onDelete ? (
					<span class='material-icons' onClick={onDelete}>
						delete
					</span>
				) : null}
				{canDrag ? <span class='material-icons'>open_with</span> : null}
			</div>
		</div>
	)
}
const withDraggable = (component, order) => {
	return (
		<Draggable draggableId={`key-${order}`} index={order} key={order}>
			{provided => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					{component}
				</div>
			)}
		</Draggable>
	)
}

/**
 * used to render field with a specific type
 *
 * @param {Object} data fields data
 * @param {string | number } order order number of field
 * @param {Object} control control method from react-hook-form
 * @param {Function} onFileChange event applied to file input, we can manage file separately with react-hook-form data
 *
 * @return {HTMLElement | null}
 */
const renderField = (fieldDetail, order, control, onFileChange) => {
	switch (fieldDetail.type) {
		case 'rich-text':
			return (
				<Controller
					control={control}
					name={fieldDetail.name}
					render={({ onChange, ref, value }) => (
						<RichText
							label={fieldDetail.label}
							onChange={onChange}
							reference={ref}
							value={value}
							disabled={fieldDetail.disabled}
						/>
					)}
				/>
			)
		case 'date':
			return (
				<Controller
					control={control}
					name={fieldDetail.name}
					render={({ onChange, ref, value }) => (
						<DatePicker
							label={fieldDetail.label}
							onChange={onChange}
							reference={ref}
							value={value}
							disabled={fieldDetail.disabled}
						/>
					)}
				/>
			)
		case 'select':
			return (
				<Controller
					control={control}
					name={fieldDetail.name}
					render={({ onChange, ref, value }) => {
						return (
							<Select
								options={fieldDetail.options}
								label={fieldDetail.label}
								onChange={onChange}
								reference={ref}
								value={value}
								disabled={fieldDetail.disabled}
							/>
						)
					}}
				/>
			)
		case 'checkbox':
			return (
				<Controller
					control={control}
					name={fieldDetail.name}
					render={({ onChange, onBlur, ref, value, ...props }) => {
						return (
							<Checkbox
								name={fieldDetail.name}
								label={fieldDetail.label}
								checked={value}
								onChange={e => onChange(e.target.value)}
								reference={ref}
								disabled={fieldDetail.disabled}
							/>
						)
					}}
				/>
			)
		case 'file':
			return <Input {...fieldDetail} key={order} onChange={onFileChange} />
		case 'text':
		case 'number':
		case 'textarea':
		case 'input':
		default:
			return <Input {...fieldDetail} key={order} />
	}
}

const renderFields = (
	data,
	control,
	draggable = false,
	onDelete,
	onFileChange
) => {
	if (data && data.length) {
		return data.map(({ config, order }) => {
			const _onDelete = () => {
				if (onDelete && typeof onDelete === 'function') {
					onDelete(order)
				}
			}
			return (
				<div style={{ cursor: 'pointer' }}>
					{draggable
						? withDraggable(
								withControl(
									renderField(config, order, control, onFileChange),
									_onDelete,
									true
								),
								order
						  )
						: renderField(config, order, control, onFileChange)}
				</div>
			)
		})
	}
	return null
}
/**
 *
 *
 * @param {String} type type of input
 * @param {Object} register object support by react hook form
 *
 * @return {Array} result of field config / options
 */
const getFieldConfigs = (type, register) => {
	const commonConfigs = [
		{
			order: 1,
			config: {
				label: 'Label',
				mandatory: true,
				name: 'label',
				type: 'text',
				reference: register({
					required: {
						value: true,
						message: 'required'
					}
				})
			}
		}
	]
	switch (type) {
		case 'date':
			return [
				...commonConfigs,
				{
					order: 3,
					config: {
						label: 'Defaultvalue',
						name: 'defaultValue',
						type: 'date'
					}
				}
			]
		case 'number':
			return [
				...commonConfigs,
				{
					order: 2,
					config: {
						label: 'Is required?',
						name: 'isRequired',
						type: 'checkbox'
					}
				},
				{
					order: 3,
					config: {
						label: 'Defaultvalue',
						name: 'defaultValue',
						type: 'text',
						reference: register()
					}
				}
			]
		case 'text':
			return [
				...commonConfigs,
				{
					order: 2,
					config: {
						label: 'Is required?',
						name: 'isRequired',
						type: 'checkbox'
					}
				},

				{
					order: 3,
					config: {
						label: 'Select pattern',
						name: 'regexName',
						type: 'select',
						options: regexOptions
					}
				}
			]
		case 'rich-text':
			return commonConfigs
		case 'checkbox':
			return commonConfigs
		case 'file':
			return [
				...commonConfigs,
				{
					order: 2,
					config: {
						label: 'Is multiple?',
						name: 'isMultiple',
						type: 'checkbox'
					}
				}
			]

		case 'select':
			return [
				...commonConfigs,
				{
					order: 2,
					config: {
						label: 'Options (write options comma separated)',
						name: 'options',
						type: 'text',
						reference: register({
							required: {
								value: true,
								message: 'required'
							}
						})
					}
				},
				{
					order: 3,
					config: {
						label: 'Is required?',
						name: 'isRequired',
						type: 'checkbox'
					}
				}
			]

		case 'textarea':
			return [
				...commonConfigs,
				{
					order: 2,
					config: {
						label: 'Is required?',
						name: 'isRequired',
						type: 'checkbox'
					}
				}
			]
		default:
			return []
	}
}
/**
 * util to create Json template for a form from configs
 *
 * @param {Object}	config					contain all the configuration fields for new element
 *
 * @param {String}	type					type of new element
 *
 * @param {Array}	elementSourceOptions 	source of elements
 *
 * @return {Object}							template
 */
const initFormTemplateJson = (config, type, elementSourceOptions, order) => {
	const {
		label,
		isRequired,
		isMultiple,
		options,
		regexName,
		defaultValue
	} = config
	const fieldDetail = {}

	const selectedElement = elementSourceOptions.find(item => item.value === type)
	if (selectedElement) {
		fieldDetail.type = selectedElement.type
	}
	if (defaultValue) {
		fieldDetail.defaultValue = defaultValue
	}
	if (selectedElement.type === 'date') {
		fieldDetail.defaultValue = new Date()
	}
	if (label) {
		fieldDetail.label = label
	}
	const validation = {}
	if (isRequired) {
		fieldDetail.mandatory = true
		validation.required = {
			value: true,
			message: 'required'
		}
	}
	if (isMultiple) {
		fieldDetail.multiple = true
	}
	if (selectedElement.type === 'textarea') {
		fieldDetail.multiline = true
	}
	if (options) {
		fieldDetail.options = options.split(',').map(o => {
			return { value: o.trim().toLowerCase(), label: o.trim() }
		})
	}
	if (regexName && regexName !== 'no-validate') {
		validation.pattern = {
			message: 'field is not valid'
		}
		fieldDetail.regexName = regexName
	}
	fieldDetail.validation = validation
	fieldDetail.name = slug(label)
	return { order, config: fieldDetail }
}
const encodeHtml = value => {
	return value.replace(/</g, '[').replace(/>/g, ']')
}
const decodeHtml = value => {
	return value.replace(/\[/g, '<').replace(/\]/g, '>')
}
export default {
	renderFields,
	encodeHtml,
	decodeHtml,
	initFormTemplateJson,
	getFieldConfigs
}

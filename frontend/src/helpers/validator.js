const regex = {
	number: /^[0-9]*$/,
	emptyField: /(.|\s)*\S(.|\s)*/,
	email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	// any 8 characters
	min8Characters: /^.{8,}$/,
	// contain at least 1 lowercase character, 1 uppercase character, 1 number, 1 special character and min 8 characters in total
	password: /^.{8,}$/,
	finnishPhoneNo: /^((([\+][\s]?)|([0]{2}[\s-]?))([358]{3})([\s-]?)|([0]))(([1-9][0-9]?)([\s-]?)([0-9]{2,4})([\s-]?)([0-9]{2,4})([\s-]?))([0-9]{0,3})$/,
	excludeCharacterForName: /^((?!<)(?!>)(?!\/)(?!&).)*$/
}
const mergeRegexes = regexes => {
	let regexString = ''
	regexes.forEach(item => {
		const newStr = item.toString()
		regexString += `(?=${newStr
			.substring(0, newStr.length - 1)
			.substring(1, newStr.length)})`
	})
	return new RegExp(regexString)
}
/**
 * Validator input, true when haveError
 * @param  {String} input
 * @param  {('emptyField'|'email'|'min8Characters'|'password'|'finnishPhoneNo')} validatorType
 * @returns Boolean
 */
const validator = (input, validatorType) => {
	if (regex[validatorType] === undefined) {
		throw new Error('validatorType is not exists')
	}

	return !regex[validatorType].test(input)
}
const responseValidator = (response, successfulStatus = [200, 204]) => {
	console.log(
		response.payload &&
			successfulStatus.some(status => response.payload.status === status)
	)
	return (
		response.payload &&
		successfulStatus.some(status => response.payload.status === status)
	)
}
export default { validator, regex, responseValidator, mergeRegexes }

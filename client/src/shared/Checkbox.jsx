import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Checkbox from '@material-ui/core/Checkbox'
import { primaryColor } from '../../constants'
// Checkbox will be at the start of the view
const CustomCheckbox = withStyles({
	root: {
		color: primaryColor,
		'&$checked': {
			color: primaryColor
		}
	},
	checked: {}
})(props => <Checkbox color='default' {...props} />)
export default ({
	checked,
	onChange,
	label,
	containerClassName,
	color = 'primary',
	reference,
	...props
}) => {
	const _onChange = e => {
		if (onChange && typeof onChange === 'function') {
			return onChange({ target: { value: !checked, name: e.target.name } })
		}
	}
	const containerClass = containerClassName
		? [containerClassName].concat(['checkbox__container'])
		: ['checkbox__container']
	return (
		<label className={containerClass.join(' ')}>
			<CustomCheckbox
				checked={checked}
				onChange={_onChange}
				value={checked}
				color={color}
				inputRef={reference}
				{...props}
			/>
			<span className='checkbox-label'>{label !== '' && label}</span>
		</label>
	)
}

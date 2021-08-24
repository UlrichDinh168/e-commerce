import React, { forwardRef } from 'react'

const Button = forwardRef(
	(
		{
			text,
			onClick,
			loading,
			className,
			textClassName,
			buttonProps,
			containerClassName,
			iconClassName,
			iconPosition,
			type = 'button',
			disabled,
			...props
		},
		ref
	) => {
		const buttonTextClassName = textClassName
			? [textClassName].concat(['button-text']).join(' ')
			: 'button-text'
		const buttonContainerClassName = containerClassName
			? ['button-container'].concat([containerClassName]).join(' ')
			: 'button-container'
		const classNameDefault = disabled ? [] : ['withBackground']
		const renderIcon = () => <i className={`${iconClassName} icon`} />
		return (
			<div className={buttonContainerClassName} ref={ref} {...props}>
				<button
					onClick={onClick}
					className={classNameDefault.concat(className).join(' ')}
					type={type}
					{...buttonProps}
					disabled={disabled}
				>
					{/* {loading && (
						<i
						className="fa fa-refresh fa-spin"
						style={{ marginRight: "5px" }}
						/>
					)} */}
					<div
						className={`${buttonTextClassName} ${
							iconPosition ? `icon-${iconPosition}` : ''
						} ${iconClassName && !text ? 'button-icon' : ''}`}
					>
						{loading
							? iconClassName && iconPosition === 'start' && renderIcon()
							: ''}
						{text}
						{iconClassName && iconPosition === 'end' && renderIcon()}
					</div>
				</button>
			</div>
		)
	}
)

export default Button

import React from 'react'

import Button from './Button'

export default ({
	children,
	show,
	closeModal,
	modalContainerClassName,
	contentClassName,
	header,
	renderFooter,
	disabledClickOutside
}) => {
	const onModalClick = e => {
		if (disabledClickOutside) {
			return
		}
		if (e.target.type === 'checkbox') {
			return
		}
		if (e.defaultPrevented) {
			return
		}
		if (closeModal) {
			closeModal()
		}
	}
	const onContentClick = e => {
		if (e.target.type === 'checkbox') {
			return
		}
		return e.preventDefault()
	}
	const modalWrapperClass = ['modal__wrapper']
	if (show) {
		modalWrapperClass.push('show')
	} else {
		modalWrapperClass.push('hide')
	}
	const modalContainerClass = ['modal__container']
	if (modalContainerClassName) {
		modalContainerClass.push(modalContainerClassName)
	}
	const closeButtonClick = e => {
		e.stopPropagation()

		if (closeModal) {
			closeModal()
		}
	}
	return (
		<div className={modalWrapperClass.join(' ')} onClick={onModalClick}>
			<div className={modalContainerClass.join(' ')} onClick={onContentClick}>
				<div className='modal__header'>
					<Button
						className='button-icon-with-text'
						containerClassName='modal__close-button-container'
						iconClassName='icon-transparent fal fa-times'
						iconPosition='start'
						onClick={closeButtonClick}
					></Button>

					{header && <h2>{header}</h2>}
				</div>

				<div className={`modal__content ${contentClassName || ''}`}>
					{children}
				</div>
				{renderFooter && <div className='modal__footer'>{renderFooter()}</div>}
			</div>
		</div>
	)
}

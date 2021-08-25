/**
 * Menus display a list of choices on temporary surfaces.
 *
 * @author Anh Tu Le <anh.le@vertics.co>
 *
 * @copyright Vertics Oy 2021
 */

import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Paper from '@material-ui/core/Paper'
import Popover from '@material-ui/core/Popover'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { NavLink } from 'react-router-dom'
import { userUtils } from 'helpers'

export default function CustomMenu({
	user,
	data,
	menuListId = 'menu-list-grow',
	label = 'Menu',
	anchorOrigin = {
		vertical: 'bottom',
		horizontal: 'center'
	},
	transformOrigin = {
		vertical: 'top',
		horizontal: 'left'
	}
}) {
	const [open, setOpen] = React.useState(false)
	const anchorRef = React.useRef(null)
	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen)
	}

	const handleClose = event => {
		setOpen(false)
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open)
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus()
		}

		prevOpen.current = open
	}, [open])

	const renderMenu = () => {
		return data.map((menu, i) => {
			const isRoleValid = userUtils.isUserRoleValid(user.groups, menu.access)
			if (!isRoleValid) {
return null
}
			return (
				<NavLink to={menu.route} onClick={handleClose} key={i}>
					<MenuItem>{menu.label}</MenuItem>
				</NavLink>
			)
		})
	}
	return (
		<div className='custom-menu'>
			<MenuItem ref={anchorRef} onClick={handleToggle}>
				{label}
			</MenuItem>
			{data && data.length ? (
				<Popover
					open={open}
					anchorEl={anchorRef.current}
					transition
					anchorOrigin={anchorOrigin}
					transformOrigin={transformOrigin}
				>
					<Paper>
						<ClickAwayListener onClickAway={handleClose}>
							<MenuList autoFocusItem={open} id={menuListId}>
								{renderMenu()}
							</MenuList>
						</ClickAwayListener>
					</Paper>
				</Popover>
			) : null}
		</div>
	)
}

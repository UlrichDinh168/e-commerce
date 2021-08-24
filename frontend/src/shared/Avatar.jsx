import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Popover from 'shared/components/Popover'
export default function AvatarCustom({
	src,
	notifications = [
		{ message: 'Make it fast to add and organize tasks' },
		{ message: 'Offer multiple ways to organize your tasks' },
		{ message: 'Remind you about self-imposed deadlines' },
		{ message: 'Remind you about self-imposed deadlines' }
	],
	text = 'V',
	onNotificationClick
}) {
	const avatarEl = (
		<Badge badgeContent={notifications.length} color='primary'>
			<Avatar alt='Remy Sharp' src={src}>
				{text}
			</Avatar>
		</Badge>
	)
	const _onNotificationClick = noti => {
		if (onNotificationClick && typeof onNotificationClick === 'function') {
			onNotificationClick(noti)
		}
	}
	const renderNotifications = () => {
		if (!notifications || !notifications.length) {
			return null
		}

		return notifications.map(noti => (
			<div
				className='noti-item'
				onNotificationClick={() => _onNotificationClick(noti)}
			>
				{noti.message}
			</div>
		))
	}
	return (
		<div className='avatar'>
			<Popover toggleEl={avatarEl}>
				<div className='avatar-popover__content'>
					{notifications && notifications.length ? (
						<>
							<h3>Notifications</h3>
							{renderNotifications()}
						</>
					) : (
						'Empty'
					)}
				</div>
			</Popover>
		</div>
	)
}

import React from 'react'
import Icon from './utility/Icon'
import lightIcon from '../assets/icon-light-mode.svg'
import darkIcon from '../assets/icon-dark-mode.svg'

export default function ThemeToggle({ dark = false }) {
	let togClassName = 'rounded-full w-3 h-3 bg-light1'
	togClassName += !dark ? ' ml-auto' : ''

	return (
		<div className='flex items-center gap-2 mt-auto'>
			<Icon src={darkIcon} />
			<div className='flex items-center rounded-full p-1 bg-mid1 w-10 h-5 hover:cursor-pointer'>
				<div className={togClassName}></div>
			</div>
			<Icon src={lightIcon} />
		</div>
	)
}

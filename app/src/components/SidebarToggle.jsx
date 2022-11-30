import { useContext } from 'react'
import { HandlerContext } from './App'
import Icon from './utility/Icon'
import close from '../assets/icon-close.svg'
import open from '../assets/icon-menu.svg'

export default function SidebarToggle({ opened = false }) {
	const { handleSidebarOpen, test } = useContext(HandlerContext)
	return (
		<div
			onClick={() => handleSidebarOpen()}
			className='grid items-center w-14 p-4 bg-dark3 md:w-auto md:p-6 hover:cursor-pointer'
		>
			<Icon src={opened ? close : open} />
		</div>
	)
}

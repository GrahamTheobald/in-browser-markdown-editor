import React from 'react'
import SideBarToggle from './SidebarToggle'
import Delete from './Delete'
import Logo from './utility/Logo'
import Button from './Button'
import save from '../assets/icon-save.svg'

export default function Nav() {
	return (
		<section className='flex w-screen bg-dark2 text-light1 h-12 md:h-16'>
			<SideBarToggle />
			<nav className='flex items-center flex-grow gap-4 p-1 md:p-2'>
				<div className='hidden lg:block'>
					<Logo />
				</div>

				<div />
				<div className=' ml-auto justify-self-end'>
					<Delete />
				</div>
				<Button src={save} text={'Save Changes'} />
			</nav>
		</section>
	)
}

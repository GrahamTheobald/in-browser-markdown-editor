import React from 'react'
import SideBarToggle from './SidebarToggle'
import Delete from './Delete'
import logo from '../assets/logo.svg'
import Icon from './utility/Icon'
import Button from './Button'
import File from './File'
import save from '../assets/icon-save.svg'

export default function Nav({ sidebarOpen, activeFile }) {
	return (
		<section className='flex flex-grow bg-dark2 text-light1 h-12 min-w-[50vw] md:h-16'>
			<SideBarToggle />
			<nav className='flex items-center flex-grow gap-4 p-1 md:p-2'>
				<div className='hidden p-6 lg:block'>
					<Icon src={logo} className={'border-r-mid2 border-r'} />
				</div>
				<div className='border-r-mid2 border-r lg:h-full'></div>
				{activeFile && <File content={activeFile} />}
				{!sidebarOpen && (
					<div className=' ml-auto flex gap-4 items-center'>
						<Delete />
						<div>
							<Button src={save} text={'Save Changes'} small={true} />
						</div>
					</div>
				)}
			</nav>
		</section>
	)
}

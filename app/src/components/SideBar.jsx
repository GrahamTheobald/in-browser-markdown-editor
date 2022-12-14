import React from 'react'
import logo from '../assets/logo.svg'
import Icon from './utility/Icon'
import Button from './Button'
import File from './File'
import ThemeToggle from './ThemeToggle'

export default function SideBar({ sidebarOpen, files, newDocument }) {
	return (
		<>
			{sidebarOpen && (
				<div className='flex flex-col flex-shrink-0 bg-dark2 w-60 p-4 h-full md:p-6'>
					<div className='py-1 lg:hidden'>
						<Icon src={logo} />
					</div>
					<h2 className=' text-mid1 tracking-wide my-6'>MY DOCUMENTS</h2>
					<div>
						<Button handler={newDocument} text={'+ New Document'} />
					</div>
					<ul className=' py-6 space-y-6 max-h-full mb-6 overflow-auto'>
						{files.map((file) => {
							return (
								<li key={file.id}>
									<File content={file} />
								</li>
							)
						})}
					</ul>
					<ThemeToggle />
				</div>
			)}
		</>
	)
}

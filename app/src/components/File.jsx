import { useContext, useState, useRef } from 'react'
import { HandlerContext } from './App'
import Icon from './utility/Icon'
import documentIcon from '../assets/icon-document.svg'

export default function File({ content }) {
	const { createdAt, name } = content
	const [focused, setFocused] = useState(false)
	const [newName, setNewName] = useState(name)
	const { handleActiveFile } = useContext(HandlerContext)
	const input = useRef()
	return (
		<div
			onClick={() => handleActiveFile(content.id)}
			className='flex items-center gap-4'
		>
			<Icon src={documentIcon} small={true} />
			<div>
				<p className='text-mid1 text-sm hidden md:block'>
					{formatDate(createdAt)}
				</p>
				{focused ? (
					<form className='w-full h-full'>
						<input
							onChange={(e) => setNewName(e.target.value)}
							autoFocus
							spellCheck='false'
							value={newName}
							onBlur={() => setFocused(false)}
							className='text-light1 text-sm break-all outline-none bg-mid1 rounded-sm h-6'
						/>
					</form>
				) : (
					<p
						onFocus={() => {
							setFocused(true)
							input.current.focus()
						}}
						tabIndex={-1}
						className='text-light1 text-sm break-all h-6 flex items-center'
					>
						{name}
					</p>
				)}
			</div>
		</div>
	)
}

function formatDate(milliseconds) {
	const date = new Date(milliseconds)
	const options = {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	}
	return new Intl.DateTimeFormat('en-GB', options).format(date)
}

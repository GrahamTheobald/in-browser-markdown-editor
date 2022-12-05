import { useContext, useState, useRef } from 'react'
import { HandlerContext } from './App'
import Icon from './utility/Icon'
import documentIcon from '../assets/icon-document.svg'
import formatDate from '../hooks/formatDate'

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
						onDoubleClick={() => {
							setFocused(true)
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

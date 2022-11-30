import { useContext } from 'react'
import { HandlerContext } from './App'
import Icon from './utility/Icon'
import documentIcon from '../assets/icon-document.svg'

export default function File({ content }) {
	const { handleActiveFile } = useContext(HandlerContext)
	const { createdAt, name } = content
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
				<p className='text-light1 text-sm break-all'>{name}</p>
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

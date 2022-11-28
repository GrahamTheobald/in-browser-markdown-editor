import React from 'react'
import Icon from './utility/Icon'

export default function Button({ src, text }) {
	return (
		<button className=' bg-orange1 flex items-center gap-2 p-2 rounded-md'>
			{src && <Icon src={src} />}
			<p className='hidden md:block'>{text}</p>
		</button>
	)
}

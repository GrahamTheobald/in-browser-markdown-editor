import React from 'react'
import Icon from './utility/Icon'

export default function Button({
	src,
	text,
	small = false,
	handler = () => null,
}) {
	return (
		<button
			onClick={() => handler()}
			className=' bg-orange1 flex items-center justify-center gap-2 p-2 rounded-md text-light1 w-full hover:bg-orange2'
		>
			{src && <Icon src={src} />}
			<p className={small ? 'hidden md:block' : undefined}>{text}</p>
		</button>
	)
}

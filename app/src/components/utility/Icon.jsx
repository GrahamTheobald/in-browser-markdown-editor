import React from 'react'

export default function Icon({ src, small = false, highlight = false }) {
	let className = ''
	className += small ? 'w-4' : ''
	className += highlight ? ' brightness-200' : ''
	return <img className={className} src={src} />
}

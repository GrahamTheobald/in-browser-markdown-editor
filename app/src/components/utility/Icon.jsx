import React from 'react'

export default function Icon({ src, small = false, light = false }) {
	let className = ''
	className += small ? 'w-4' : ''
	return <img className={className} src={src} />
}

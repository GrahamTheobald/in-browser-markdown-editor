import React from 'react'

export default function Icon({ src, small = false }) {
	let className = ''
	small ? (className += 'w-4') : ''
	return <img className={className} src={src} />
}

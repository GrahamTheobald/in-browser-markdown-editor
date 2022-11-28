import React from 'react'
import Icon from './Icon'
import logo from '../../assets/logo.svg'

export default function Logo() {
	return (
		<div className='p-6'>
			<Icon src={logo} />
		</div>
	)
}

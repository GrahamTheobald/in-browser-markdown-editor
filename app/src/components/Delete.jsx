import React, { useState } from 'react'
import Modal from './Modal'
import Icon from './utility/Icon'
import del from '../assets/icon-delete.svg'

export default function Delete() {
	const [modal, setModal] = useState(false)

	function handleCloseModal() {
		setModal(false)
	}

	return (
		<>
			{modal && <Modal closeModal={handleCloseModal} />}
			<div onClick={() => setModal(true)} className='hover:cursor-pointer'>
				<Icon src={del} small={true} />
			</div>
		</>
	)
}

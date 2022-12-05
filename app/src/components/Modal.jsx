import React, { useContext } from 'react'
import { createPortal } from 'react-dom'
import { HandlerContext } from './App'
import Button from './Button'

export default function Modal({ closeModal }) {
	const { handleDelete, activeFileName } = useContext(HandlerContext)
	return createPortal(
		<div
			onClick={() => closeModal()}
			className='absolute inset-0 dark:bg-mid2 dark:bg-opacity-70  bg-dark1 bg-opacity-70 grid place-items-center p-4'
		>
			<div className='max-w-sm p-6 bg-light1 dark:bg-dark1 text-mid2 font-Roboto-Slab rounded-md flex flex-col gap-4'>
				<p className=' text-lg font-bold text-dark1 dark:text-light2'>
					Delete this document?
				</p>
				<p>
					Are you sure you want to delete the
					<span>{` '${activeFileName}' `}</span> document and its contents?{' '}
					<br />
					This action cannot be reversed.
				</p>
				<Button text='Confirm & Delete' handler={handleDelete} />
			</div>
		</div>,
		document.body
	)
}

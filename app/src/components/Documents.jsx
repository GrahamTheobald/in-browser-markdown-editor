import { useState } from 'react'
import Icon from './utility/Icon'
import showPreviewIcon from '../assets/icon-show-preview.svg'
import hidePreviewIcon from '../assets/icon-hide-preview.svg'

export default function Documents({ activeFile }) {
	const [showPreview, setShowPreview] = useState(false)
	function handleShowPreview() {
		setShowPreview((prev) => !prev)
	}
	return (
		<div className='flex w-full'>
			{!showPreview && (
				<section className='flex-1 max-h-fit min-w-[50vw]'>
					<h3 className=' p-3 bg-light2 text-mid2 tracking-wider flex justify-between items-center sticky top-0'>
						MARKDOWN
						<div onClick={() => handleShowPreview()} className='md:hidden'>
							<Icon src={showPreview ? hidePreviewIcon : showPreviewIcon} />
						</div>
					</h3>
					<pre className='whitespace-pre-wrap p-3 text-sm'>
						{activeFile.content}
					</pre>
				</section>
			)}

			<section className='flex-1 break-normal min-w-[50vw] hidden border-l border-l-light1 md:block '>
				<h3 className=' p-3 bg-light2 text-mid2 tracking-wider flex justify-between items-center sticky top-0'>
					PREVIEW
					<div onClick={() => handleShowPreview()} className='hidden md:block'>
						<Icon src={showPreview ? hidePreviewIcon : showPreviewIcon} />
					</div>
				</h3>
			</section>
		</div>
	)
}

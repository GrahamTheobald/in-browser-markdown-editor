import { useState } from 'react'
import useRenderMD from '../hooks/useRenderMD'
import Icon from './utility/Icon'
import showPreviewIcon from '../assets/icon-show-preview.svg'
import hidePreviewIcon from '../assets/icon-hide-preview.svg'

export default function Documents({ activeFile }) {
	const { content } = activeFile
	const [showPreview, setShowPreview] = useState(false)
	function handleShowPreview() {
		setShowPreview((prev) => !prev)
	}

	let previewClassName = 'flex-1 min-w-[50vw] overflow-y-auto md:block'
	previewClassName += !showPreview ? ' hidden' : ''
	return (
		<div className='flex w-full overflow-x-hidden h-[calc(100%-3rem)] md:h-[calc(100%-4rem)]'>
			{!showPreview && (
				<section className='flex-1 min-w-[50vw] border-r border-r-light1 overflow-y-auto'>
					<h3 className=' p-3 bg-light2 text-mid2 tracking-wider flex justify-between items-center sticky top-0'>
						MARKDOWN
						<div onClick={() => handleShowPreview()} className='md:hidden'>
							<Icon src={showPreview ? hidePreviewIcon : showPreviewIcon} />
						</div>
					</h3>
					<pre className='whitespace-pre-wrap p-3 text-sm overflow-y-auto'>
						{content}
					</pre>
				</section>
			)}

			<section className={previewClassName}>
				<h3 className=' p-3 bg-light2 text-mid2 tracking-wider flex justify-between items-center sticky top-0'>
					PREVIEW
					<div onClick={() => handleShowPreview()}>
						<Icon src={showPreview ? hidePreviewIcon : showPreviewIcon} />
					</div>
				</h3>
				<div className='lg:max-w-2xl max-w-[100vw] mx-auto p-4 break-words'>
					{useRenderMD(content)}
				</div>
			</section>
		</div>
	)
}

import { useState, useEffect } from 'react'
import useRenderMD from '../hooks/useRenderMD'
import Icon from './utility/Icon'
import showPreviewIcon from '../assets/icon-show-preview.svg'
import hidePreviewIcon from '../assets/icon-hide-preview.svg'

export default function Documents({ activeFile, saveMd, handleSaveMd }) {
	const [showPreview, setShowPreview] = useState(false)
	const [mdText, setMdText] = useState(activeFile.content)
	const [html] = useRenderMD(activeFile, mdText)

	function handleShowPreview() {
		setShowPreview((prev) => !prev)
	}

	useEffect(() => {
		if (!saveMd) return
		handleSaveMd(activeFile.id)
	}, [saveMd])

	useEffect(() => {
		setMdText(activeFile.content)
	}, [activeFile])

	let previewClassName = 'flex-1 min-w-[50vw] overflow-y-auto md:block'
	previewClassName += !showPreview ? ' hidden' : ''
	return (
		<div className='flex w-full overflow-x-hidden h-[calc(100%-3rem)] md:h-[calc(100%-4rem)] dark:bg-dark1'>
			{!showPreview && (
				<section className='flex-1 min-w-[50vw] border-r border-r-light1 dark:border-r-mid1 overflow-y-auto'>
					<h3 className=' p-3 bg-light2 dark:bg-dark2 text-mid2 tracking-wider flex justify-between items-center sticky top-0'>
						MARKDOWN
						<div onClick={() => handleShowPreview()} className='md:hidden'>
							<Icon src={showPreview ? hidePreviewIcon : showPreviewIcon} />
						</div>
					</h3>
					<textarea
						onChange={(e) => setMdText(e.target.value)}
						value={mdText}
						spellCheck='false'
						className='whitespace-pre-wrap p-3 font-Roboto-Mono text-sm overflow-y-auto w-full h-full resize-none outline-none dark:bg-dark1 dark:text-mid3'
					/>
				</section>
			)}

			<section className={previewClassName}>
				<h3 className=' p-3 bg-light2 dark:bg-dark2 text-mid2 tracking-wider flex justify-between items-center sticky top-0'>
					PREVIEW
					<div onClick={() => handleShowPreview()}>
						<Icon src={showPreview ? hidePreviewIcon : showPreviewIcon} />
					</div>
				</h3>
				<div className='lg:max-w-2xl max-w-[100vw] mx-auto p-4 break-words dark:bg-dark1'>
					{html}
				</div>
			</section>
		</div>
	)
}

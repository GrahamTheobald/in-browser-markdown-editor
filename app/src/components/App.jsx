import { useState, createContext } from 'react'
import Sidebar from './Sidebar'
import Nav from './Nav'
import Documents from './Documents'
import data from '../data/data.json'

export const HandlerContext = createContext()

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(true)
	const [files, setFiles] = useState(data)
	const [saveMdButton, setSaveMdButton] = useState(false)
	const [dark, setDark] = useState(
		window.matchMedia('(prefers-color-scheme: dark)').matches
	)
	const [activeFileID, setActiveFileID] = useState(2)

	let rootClassName = 'font-Roboto flex h-screen overflow-x-hidden'
	rootClassName += dark ? ' dark' : ''

	const activeFile = files.find((file) => file.id === activeFileID)

	const HandlerContextValue = {
		handleSidebarOpen,
		handleActiveFile,
		handleDarkMode,
		dark,
	}

	function handleSidebarOpen() {
		setSidebarOpen((prev) => !prev)
	}
	function handleActiveFile(ID) {
		setActiveFileID(ID)
	}
	function handleDarkMode() {
		setDark((prev) => !prev)
	}
	function handleSaveMdButton() {
		setSaveMdButton(true)
	}
	function handleSaveMd(id, content) {
		const _files = [...files]
		const index = _files.findIndex((f) => f.id === id)
		_files[index].content = content
		setFiles(_files)
		setSaveMdButton(false)
	}

	return (
		<HandlerContext.Provider value={HandlerContextValue}>
			<div className={rootClassName}>
				<Sidebar sidebarOpen={sidebarOpen} files={files} />
				<div className='flex-grow w-full min-w-min h-full overflow-x-hidden '>
					<Nav
						sidebarOpen={sidebarOpen}
						activeFile={activeFile}
						saveButton={handleSaveMdButton}
					/>
					<Documents
						activeFile={activeFile}
						saveMd={saveMdButton}
						handleSaveMd={handleSaveMd}
					/>
				</div>
			</div>
		</HandlerContext.Provider>
	)
}

export default App

import { useState, createContext } from 'react'
import Sidebar from './Sidebar'
import Nav from './Nav'
import Documents from './Documents'
import data from '../data/data.json'

export const HandlerContext = createContext()

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(true)
	const [files, setFiles] = useState(data)
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

	return (
		<HandlerContext.Provider value={HandlerContextValue}>
			<div className={rootClassName}>
				<Sidebar sidebarOpen={sidebarOpen} files={files} />
				<div className='flex-grow w-full min-w-min h-full overflow-x-hidden '>
					<Nav sidebarOpen={sidebarOpen} activeFile={activeFile} />
					<Documents activeFile={activeFile} />
				</div>
			</div>
		</HandlerContext.Provider>
	)
}

export default App

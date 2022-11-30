import { useState, createContext } from 'react'
import Sidebar from './Sidebar'
import Nav from './Nav'
import Documents from './Documents'
import data from '../data/data.json'

export const HandlerContext = createContext()

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(true)
	const [files, setFiles] = useState(data)
	const [activeFileID, setActiveFileID] = useState(2)

	const activeFile = files.find((file) => file.id === activeFileID)

	const HandlerContextValue = {
		handleSidebarOpen,
		handleActiveFile,
	}

	function handleSidebarOpen() {
		setSidebarOpen((prev) => !prev)
	}
	function handleActiveFile(ID) {
		setActiveFileID(ID)
	}

	return (
		<HandlerContext.Provider value={HandlerContextValue}>
			<div className=' font-Roboto flex h-screen overflow-x-hidden'>
				<Sidebar sidebarOpen={sidebarOpen} files={files} />
				<div className=' flex-grow w-full overflow-x-hidden min-w-min'>
					<Nav sidebarOpen={sidebarOpen} activeFile={activeFile} />
					<Documents activeFile={activeFile} />
				</div>
			</div>
		</HandlerContext.Provider>
	)
}

export default App

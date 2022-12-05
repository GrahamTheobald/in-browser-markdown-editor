import { useState, createContext } from 'react'
import Sidebar from './Sidebar'
import Nav from './Nav'
import Documents from './Documents'
import data from '../data/data.json'
import { useEffect } from 'react'
import uuid4 from 'uuid4'
import nameDocument from '../hooks/nameDocument'

export const HandlerContext = createContext()

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [files, setFiles] = useState(data)
	const [saveMdButton, setSaveMdButton] = useState(false)
	const [dark, setDark] = useState(
		window.matchMedia('(prefers-color-scheme: dark)').matches
	)
	const [activeFileID, setActiveFileID] = useState(1)

	const activeFile = files.find((file) => file.id === activeFileID)

	const HandlerContextValue = {
		handleSidebarOpen,
		handleActiveFile,
		handleDarkMode,
		handleDelete,
		dark,
		activeFileName: activeFile?.name ?? 'None',
	}

	useEffect(() => {
		dark
			? document.body.classList.add('dark')
			: document.body.classList.remove('dark')
	}, [dark])

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
	function handleDelete() {
		const _files = files.filter((f) => f.id !== activeFileID)
		if (_files.length === 0) {
			_files.push(data[0])
		}
		setFiles(_files)
		setActiveFileID(_files[0].id)
	}
	function handleSaveMd(id, content) {
		const _files = [...files]
		const index = _files.findIndex((f) => f.id === id)
		_files[index].content = content
		setFiles(_files)
		setSaveMdButton(false)
	}
	function handleNewDocument() {
		const _files = [...files]
		const newDocument = {
			id: uuid4(),
			createdAt: Date.now(),
			name: nameDocument(files),
			content: '',
		}
		_files.push(newDocument)
		setFiles(_files)
	}

	return (
		<HandlerContext.Provider value={HandlerContextValue}>
			<div className='font-Roboto flex h-screen overflow-x-hidden'>
				<Sidebar
					newDocument={handleNewDocument}
					sidebarOpen={sidebarOpen}
					files={files}
				/>
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

import { useState } from 'react'
import Sidebar from './Sidebar'
import Nav from './Nav'
import Documents from './Documents'

function App() {
	const [count, setCount] = useState(0)
	return (
		<div className=' font-Roboto flex'>
			<Sidebar />
			<div>
				<Nav />
				<Documents />
			</div>
		</div>
	)
}

export default App

import { useEffect } from 'react'
import STORAGE_KEY from '../data/storageKey'

export default function useLocalStorage(files) {
	useEffect(() => {
		const strFiles = JSON.stringify(files)
		localStorage.setItem(`${STORAGE_KEY}-files`, strFiles)
	}, [files])
	return
}

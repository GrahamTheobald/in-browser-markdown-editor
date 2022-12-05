import uuid4 from 'uuid4'

export default function nameDocument(files) {
	if (!searchName(files, 'untitled.md')) return 'untitled.md'
	for (let i = 1; i < 1000; i++) {
		const name = `untitled${i}.md`
		if (!searchName(files, name)) return name
	}
	return 'untitled.md'
}

function searchName(files, name) {
	return files.some((f) => f.name === name)
}

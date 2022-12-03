export default function formatDate(milliseconds) {
	const date = new Date(milliseconds)
	const options = {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	}
	return new Intl.DateTimeFormat('en-GB', options).format(date)
}

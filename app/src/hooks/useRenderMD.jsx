import { useEffect, useState, useId } from 'react'

const LINE_FORMATS = {
	'#': 'ph1',
	'##': 'ph2',
	'###': 'ph3',
	'####': 'ph4',
	'#####': 'ph5',
	'######': 'ph6',
	'```': 'pblockc',
	'>': 'pblockq',
	'-': 'pul',
	'1.': 'pol',
}
const INLINE_FORMATS = {
	'`': 'pcode',
	'[': 'pa',
	'*': 'pi',
	_: 'pi',
	'**': 'pb',
	__: 'pb',
}

const INLINE_SYMBOLS = ['`', '[', '*', '**', '_', '__']

let ID = 1098092

export default function useRenderMD(activeFile, mdText) {
	const [html, setHtml] = useState(RenderMD(activeFile.content, ID))

	useEffect(() => {
		setHtml(RenderMD(activeFile.content, ID))
	}, [activeFile])

	useEffect(() => {
		setHtml(RenderMD(mdText))
	}, [mdText])

	return [html, setHtml]
}

function RenderMD(markdown, ID) {
	let lines = markdown.split('\n')
	const _lines = []

	while (lines.length > 0) {
		const line = lines.shift().split(' ')
		const firstWord = line[0]
		if (firstWord === '') continue
		if (line.length === 1 && firstWord === '```') {
			createCodeBlock(lines, _lines)
			continue
		}
		if (firstWord === '-') {
			createUnorderedList(line, lines, _lines)
			continue
		}
		if (orderedListCheck(firstWord)) {
			createOrderedList(line, lines, _lines)
			continue
		}
		_lines.push(createLineElement(firstWord, line))
	}

	return _lines
}

function createLineElement(firstWord, line) {
	switch (firstWord) {
		case '#':
			return (
				<h1 key={ID++} className={LINE_FORMATS[firstWord]}>
					{inlineScan(lineToLetters(restOfLine(line)))}
				</h1>
			)
		case '##':
			return (
				<h2 key={ID++} className={LINE_FORMATS[firstWord]}>
					{inlineScan(lineToLetters(restOfLine(line)))}
				</h2>
			)
		case '###':
			return (
				<h3 key={ID++} className={LINE_FORMATS[firstWord]}>
					{inlineScan(lineToLetters(restOfLine(line)))}
				</h3>
			)
		case '####':
			return (
				<h4 key={ID++} className={LINE_FORMATS[firstWord]}>
					{inlineScan(lineToLetters(restOfLine(line)))}
				</h4>
			)
		case '#####':
			return (
				<h5 key={ID++} className={LINE_FORMATS[firstWord]}>
					{inlineScan(lineToLetters(restOfLine(line)))}
				</h5>
			)
		case '######':
			return (
				<h6 key={ID++} className={LINE_FORMATS[firstWord]}>
					{inlineScan(lineToLetters(restOfLine(line)))}
				</h6>
			)
		case '>':
			return (
				<div key={ID++} className={LINE_FORMATS[firstWord]}>
					{inlineScan(lineToLetters(restOfLine(line)))}
				</div>
			)
		default:
			return (
				<p key={ID++} className='pp'>
					{inlineScan(lineToLetters(line))}
				</p>
			)
	}
}

function inlineScan(letters) {
	letters.forEach((l, index) => {
		if (INLINE_SYMBOLS.includes(l)) {
			const { symbol, symbolSpan } = inlineSearchSettings(letters, index, l)
			const searchLetters = letters.slice(index + symbolSpan)
			const indexSpan = inlineSearch(searchLetters, symbol, symbolSpan)

			if (indexSpan === -1) return

			if (l === '[') {
				const urlStart = index + indexSpan + symbolSpan + 1
				const urlSpan = inlineAnchorSearch(letters, urlStart)
				if (urlSpan === -1) return
				const entireSpan = urlStart + urlSpan + 1
				const url = letters.slice(urlStart + 1, urlStart + urlSpan).join('')
				const element = (
					<a href={url} key={ID++} className={INLINE_FORMATS[symbol]}>
						{searchLetters.slice(0, indexSpan)}
					</a>
				)
				letters.splice(index, entireSpan, element)
				return
			}
			const element = (
				<span key={ID++} className={INLINE_FORMATS[symbol]}>
					{inlineScan(searchLetters.slice(0, indexSpan))}
				</span>
			)
			letters.splice(index, indexSpan + symbolSpan * 2, element)
			return
		}
	})
	// return joinLine(letters)
	return letters
}

function joinLine(line) {
	const joined = []
	let startIndex = 0
	const endIndex = line.length
	line.forEach((l, i) => {
		console.log(typeof l)
		if (i === endIndex - 1) {
			if (typeof l === 'string') {
				const str = line.slice(startIndex, endIndex).join('')
				joined.push(str)
				return
			}
			if (typeof l === 'object') {
				const str = line.slice(startIndex, endIndex - 1).join('')
				joined.push(str)
				joined.push(l)
				return
			}
		}
		if (typeof l === 'string') return
		if (typeof l === 'object') {
			const str = line.slice(startIndex, i).join('')
			joined.push(str)
			joined.push(l)
			startIndex = i + 1
		}
	})
	return joined
}

function inlineSearch(letters, symbol, symbolSpan) {
	symbol = symbol === '[' ? ']' : symbol
	if (symbolSpan === 1) {
		return letters.findIndex((l) => l === symbol)
	}
	if (symbolSpan === 2) {
		return letters.findIndex((l, index) => {
			const next = letters[index + 1]
			if (!next) return false
			const both = l + next
			return both === symbol
		})
	}
}

function inlineAnchorSearch(letters, index) {
	if (letters[index] !== '(') return -1
	return letters.slice(index).findIndex((l) => l === ')')
}

function inlineSearchSettings(letters, index, symbol) {
	if (['*', '-'].includes(symbol)) {
		if (letters[index + 1] === symbol) {
			return { symbol: symbol + symbol, symbolSpan: 2 }
		}
	}
	return { symbol, symbolSpan: 1 }
}

function createUnorderedList(line, lines, _lines) {
	const block = [
		<li key={ID++}>{inlineScan(lineToLetters(restOfLine(line)))}</li>,
	]
	while (lines.length > 0) {
		const next = lines.shift().split(' ')

		if (next[0] !== '-') {
			lines.unshift(next.join(' '))
			const element = (
				<ul key={ID++} className='pul'>
					{block}
				</ul>
			)
			_lines.push(element)
			return
		}
		block.push(
			<li key={ID++}>{inlineScan(lineToLetters(restOfLine(next)))}</li>
		)
	}
}

function createOrderedList(line, lines, _lines) {
	const block = [
		<li key={ID++} data-number={line[0]}>
			{inlineScan(lineToLetters(restOfLine(line)))}
		</li>,
	]
	while (lines.length > 0) {
		const next = lines.shift().split(' ')

		if (!orderedListCheck(next[0])) {
			lines.unshift(next.join(' '))
			const element = (
				<ol key={ID++} className='pol'>
					{block}
				</ol>
			)
			_lines.push(element)
			return
		}
		block.push(
			<li key={ID++} data-number={next[0]}>
				{inlineScan(lineToLetters(restOfLine(next)))}
			</li>
		)
	}
}

function createCodeBlock(lines, _lines) {
	const block = []
	while (lines.length > 0) {
		const next = lines.shift()
		if (next == '```') {
			const element = (
				<pre key={ID++} className='pblockc'>
					{block.join('\n')}
				</pre>
			)
			_lines.push(element)
			return
		}
		block.push(next)
	}
}

function orderedListCheck(firstWord) {
	if (firstWord === '') return false
	return Number(firstWord.slice(0, -1)) && firstWord.slice(-1) === '.'
}

function restOfLine(line) {
	return line.slice(1, line.length)
}

function lineToLetters(line) {
	return line.join(' ').split('')
}

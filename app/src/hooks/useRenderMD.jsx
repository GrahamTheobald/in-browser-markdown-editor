import { useEffect, useId } from 'react'

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

export default function useRenderMD(markdown) {
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
				<h1 className={LINE_FORMATS[firstWord]}>
					{inlineScan(lineToLetters(restOfLine(line)))}
				</h1>
			)
		case '##':
			return (
				<h2 className={LINE_FORMATS[firstWord]}>
					{inlineScan(lineToLetters(restOfLine(line)))}
				</h2>
			)
		case '###':
			return (
				<h3 className={LINE_FORMATS[firstWord]}>
					{inlineScan(lineToLetters(restOfLine(line)))}
				</h3>
			)
		case '####':
			return (
				<h4 className={LINE_FORMATS[firstWord]}>
					{inlineScan(lineToLetters(restOfLine(line)))}
				</h4>
			)
		case '#####':
			return (
				<h5 className={LINE_FORMATS[firstWord]}>
					{inlineScan(lineToLetters(restOfLine(line)))}
				</h5>
			)
		case '######':
			return (
				<h6 className={LINE_FORMATS[firstWord]}>
					{inlineScan(lineToLetters(restOfLine(line)))}
				</h6>
			)
		case '>':
			return (
				<div className={LINE_FORMATS[firstWord]}>
					{inlineScan(lineToLetters(restOfLine(line)))}
				</div>
			)
		default:
			return <p className='pp'>{inlineScan(lineToLetters(line))}</p>
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
					<a href={url} className={INLINE_FORMATS[symbol]}>
						{searchLetters.slice(0, indexSpan)}
					</a>
				)
				letters.splice(index, entireSpan, element)

				return
			}
			const element = (
				<span className={INLINE_FORMATS[symbol]}>
					{inlineScan(searchLetters.slice(0, indexSpan))}
				</span>
			)
			letters.splice(index, indexSpan + symbolSpan * 2, element)
			return
		}
	})
	return letters
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
	const block = [<li>{inlineScan(lineToLetters(restOfLine(line)))}</li>]
	while (lines.length > 0) {
		const next = lines.shift().split(' ')

		if (next[0] !== '-') {
			lines.unshift(next.join(' '))
			const element = <ul className='pul'>{block}</ul>
			_lines.push(element)
			return
		}
		block.push(<li>{inlineScan(lineToLetters(restOfLine(next)))}</li>)
	}
}

function createOrderedList(line, lines, _lines) {
	const block = [
		<li data-number={line[0]}>
			{inlineScan(lineToLetters(restOfLine(line)))}
		</li>,
	]
	while (lines.length > 0) {
		const next = lines.shift().split(' ')

		if (!orderedListCheck(next[0])) {
			lines.unshift(next.join(' '))
			const element = <ol className='pol'>{block}</ol>
			_lines.push(element)
			return
		}
		block.push(
			<li data-number={next[0]}>
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
			const element = <pre className='pblockc'>{block.join('\n')}</pre>
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

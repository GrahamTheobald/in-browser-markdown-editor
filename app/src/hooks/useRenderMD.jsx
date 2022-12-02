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
			return <h1 className={LINE_FORMATS[firstWord]}>{restOfLine(line)}</h1>
		case '##':
			return <h2 className={LINE_FORMATS[firstWord]}>{restOfLine(line)}</h2>
		case '###':
			return <h3 className={LINE_FORMATS[firstWord]}>{restOfLine(line)}</h3>
		case '####':
			return <h4 className={LINE_FORMATS[firstWord]}>{restOfLine(line)}</h4>
		case '#####':
			return <h5 className={LINE_FORMATS[firstWord]}>{restOfLine(line)}</h5>
		case '######':
			return <h6 className={LINE_FORMATS[firstWord]}>{restOfLine(line)}</h6>
		case '>':
			return <div className={LINE_FORMATS[firstWord]}>{restOfLine(line)}</div>
		default:
			return <p className='pp'>{inlineScan(lineToLetters(line))}</p>
	}
}

function inlineScan(letters) {
	letters.forEach((letter, index) => {
		if (INLINE_SYMBOLS.includes(letter)) {
			const _index = index + 1
			const spanIndex = inlineSymbolSearch(letters.slice(_index), letter)
			if (spanIndex >= 0) {
				const element = (
					<span className={INLINE_FORMATS[letter]}>
						{inlineScan(letters.slice(_index, _index + spanIndex))}
					</span>
				)
				letters.splice(index, spanIndex + 2, element)
				return inlineScan(letters)
			}
		}
	})
	return letters
}

function inlineSymbolSearch(letters, symbol, indexes = 1) {
	return letters.findIndex((letter) => letter === symbol)
}

function createUnorderedList(line, lines, _lines) {
	const block = [<li>{restOfLine(line)}</li>]
	while (lines.length > 0) {
		const next = lines.shift().split(' ')

		if (next[0] !== '-') {
			lines.unshift(next.join(' '))
			const element = <ul className='pul'>{block}</ul>
			_lines.push(element)
			return
		}
		block.push(<li>{restOfLine(next)}</li>)
	}
}

function createOrderedList(line, lines, _lines) {
	const block = [<li data-number={line[0]}>{restOfLine(line)}</li>]
	while (lines.length > 0) {
		const next = lines.shift().split(' ')

		if (!orderedListCheck(next[0])) {
			lines.unshift(next.join(' '))
			const element = <ol className='pol'>{block}</ol>
			_lines.push(element)
			return
		}
		block.push(<li data-number={next[0]}>{restOfLine(next)}</li>)
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
	return line.slice(1, line.length).join(' ')
}

function lineToLetters(line) {
	return line.join(' ').split('')
}

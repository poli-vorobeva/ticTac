import {IBot} from "./IBot";

export class GameController {
	private matrix: number[][];
	private playerShape: "circle" | "cross";
	private activePlayer: string;
	onPlayerTurn: (shape: string, coords: { x: number, y: number }) => void
	private botShape: string;
	private playerOccupied: number;
	private botOccupied: number;
	private bot: IBot;
	private emptyCells: Set<string>;
	onFinishedGame: (winner: string) => void
	onBotTurn: (shape: string, coords: { x: number, y: number }) => void
	private activeCell: { x: number, y: number };

	constructor(shape: 'circle' | 'cross') {
		this.matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
		this.emptyCells = new Set()
		this.matrix.forEach((row, rI) => {
			row.forEach((c, cI) => {
				if (c === 0) {
					this.emptyCells.add(`${rI}-${cI}`)
				}
			})
		})
		this.playerShape = shape
		this.bot = new IBot()
		this.bot.onBotTurn = (cellIndex) => {
			const [y, x] = Array.from(this.emptyCells)[cellIndex].split('-')
			this.occupiedCell({x: +x, y: +y})
			this.changeActivePlayer()
			this.onBotTurn(this.botShape, this.getPixels({x: +x, y: +y}))
			this.isFinish(this.botOccupied)
		}
		this.activeCell = null
		this.botShape = shape === 'circle' ? 'cross' : 'circle'
		this.activePlayer = this.playerShape === 'cross' ? 'player' : 'bot'
		this.playerOccupied = 5
		this.botOccupied = 8
	}

	turn() {
		return this.activePlayer
	}

	isEmpty(cell: { x: number; y: number }) {
		return this.matrix[cell.y][cell.x] === 0
	}

	occupiedCell(cell: { x: number; y: number }) {
		this.matrix[cell.y][cell.x] = this.activePlayer === 'player' ? this.playerOccupied : this.botOccupied
		this.emptyCells.delete(`${cell.y}-${cell.x}`)
	}

	changeActivePlayer() {
		this.activePlayer = this.activePlayer === 'player' ? 'bot' : 'player'
	}

	turnDefine() {
		if (this.activePlayer === 'bot') {
			this.bot.turn(this.emptyCells)
		} else {
			this.onPlayerTurn(this.playerShape, this.getPixels())
		}
	}

	getPixels(coord?: { x: number, y: number }) {
		const c = coord || this.activeCell
		return {x: c.x * 100, y: c.y * 100}
	}

	checkHorizontal(val: number) {
		return this.matrix.some(r => r.every(c => c === val))
	}

	checkVerticals(val: number) {
		return this.matrix.some((col, colI) => {
			return col.every((row, rowI) => this.matrix[rowI][colI] == val)
		})
	}

	diagonalF(data: string[], val: number) {
		return data.every(e => {
			const d = e.split('-')
			return this.matrix[+d[0]][+d[1]] === val
		})
	}

	checkDiagonals(val: number) {
		const m = this.diagonalF(['0-0', '1-1', '2-2'], val)
		if (m) return m
		return this.diagonalF(['0-2', '1-1', '2-0'], val)
	}

	isFinish(val: number) {
		const h = this.checkHorizontal(val)
		const v = this.checkVerticals(val)
		const d = this.checkDiagonals(val)
		h||v||d && this.onFinishedGame(val === 8 ? 'bot' : 'player')
	}

	clickCell(cell: { x: number; y: number }) {
		if (this.activePlayer !== 'player') return
		if (this.isEmpty(cell)) {
			this.activeCell = cell
			this.occupiedCell(cell)
			this.turnDefine()
			this.changeActivePlayer()
			this.isFinish(this.playerOccupied)
		}

	}

	botNext() {
		this.bot.turn(this.emptyCells)
	}
}
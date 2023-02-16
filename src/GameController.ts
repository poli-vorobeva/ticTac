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
			console.log("***Bot")
			const [y, x] = Array.from(this.emptyCells)[cellIndex].split('-')
			this.occupiedCell({x: +x, y: +y})
			this.changeActivePlayer()
			this.onBotTurn(this.botShape, this.getPixels({x: +x, y: +y}))
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
		console.log(this.matrix)
		console.log(cell.y,'--',cell.x)
		console.log(this.matrix[cell.y][cell.x])
		return this.matrix[cell.y][cell.x] === 0
	}

	occupiedCell(cell: { x: number; y: number }) {
		this.matrix[cell.y][cell.x] = this.activePlayer === 'player' ? this.playerOccupied : this.botOccupied
		this.emptyCells.delete(`${cell.y}-${cell.x}`)
	}

	changeActivePlayer() {
		console.log("activePrev--", this.activePlayer)
		this.activePlayer = this.activePlayer === 'player' ? 'bot' : 'player'
		console.log("activeCur--", this.activePlayer)
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

	clickCell(cell: { x: number; y: number }) {
		if (this.activePlayer !== 'player') return
		if (this.isEmpty(cell)) {
			this.activeCell = cell
			this.occupiedCell(cell)
			this.turnDefine()
			this.changeActivePlayer()
		}

	}

	botNext() {
		this.bot.turn(this.emptyCells)
	}
}
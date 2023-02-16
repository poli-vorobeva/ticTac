export class GameController {
	private matrix: number[][];
	private playerShape: "circle" | "cross";
	private activePlayer: string;
	onPlayerTurn: (d: number) => void

	constructor(shape: 'circle' | 'cross') {
		this.matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
		this.playerShape = shape
		this.activePlayer = this.playerShape === 'cross' ? 'player' : 'bot'
	}

	turn() {
		return this.activePlayer
	}

	clickCell(cell: { x: number; y: number }) {
		console.log(cell,'#$#$')
	}
}
import Control from "../controll";
import {ChooseShape} from "../ChooseShape/ChooseShape";
import {Board} from "../GameBoard/Board";
import {typeImagesData} from "../app";

export class Game extends Control {
	private board: Board;
	private startButton: Control<HTMLElement>;
	private images: typeImagesData;

	constructor(parent: HTMLElement, images: typeImagesData) {
		super(parent);
		this.images = images
		this.gameCycle()
	}

	gameCycle() {
		this.startButton = new Control(this.node, 'button', '', 'START')
		this.startButton.node.onclick = () => {
			if (this.board) return
			this.startButton.destroy()
			const chooseShape = new ChooseShape(this.node, this.images)
			chooseShape.onChooseShape = (shape: 'circle' | 'cross') => {
				this.board = new Board(this.node, shape, this.images)
				this.board.onDeadHeat = () => {
					this.board.destroy()
					const dh = new Control(this.node, 'h2', '', 'its a dead heat')
					setTimeout(() => {
						dh.destroy()
						this.gameCycle()
					}, 1000)
				}
				this.board.onFinishedGame = (winner: string) => {
					this.board.destroy()
					this.board = null
					const f = new Control(this.node, 'h4', '', `${winner} is the winner`)
					setTimeout(() => {
						this.gameCycle()
						f.destroy()
					}, 1500)
				}
				chooseShape.destroy()
			}
		}
	}
}
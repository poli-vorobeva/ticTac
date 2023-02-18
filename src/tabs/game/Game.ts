import Control from "../../controll";
import {Board} from "../../GameBoard/Board";
import {typeImagesData} from "../../app";
import styles from './game.module.css'
import {ChooseShape} from "./ChooseShape/ChooseShape";
import {FinishScreen} from "../../GameBoard/FinishScreen";

export class Game extends Control {
	private board: Board;
	private startButton: Control<HTMLElement>;
	private images: typeImagesData;

	constructor(parent: HTMLElement, images: typeImagesData) {
		super(parent,'div',styles.wrapper);
		this.images = images
		this.gameCycle()
	}

	gameCycle() {
		this.startButton = new Control(this.node, 'button', styles.button, 'START')
		this.startButton.node.onclick = () => {
			if (this.board) return
			this.startButton.destroy()
			const chooseShape = new ChooseShape(this.node, this.images)
			chooseShape.onChooseShape = (shape: 'circle' | 'cross') => {
				this.board = new Board(this.node, shape, this.images)
				this.board.onDeadHeat = () => {
					this.board.destroy()
					const dh = new FinishScreen(this.node,'its a dead heat')
					setTimeout(() => {
						dh.destroy()
						this.gameCycle()
					}, 1000)
				}
				this.board.onFinishedGame = (winner: string) => {
					this.board.destroy()
					this.board = null
					const f = new FinishScreen(this.node, `${winner} is the winner`)
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
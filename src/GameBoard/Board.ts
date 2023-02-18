import Control from "../controll";
import {CanvasComponent} from "./CanvasComponent";
import {typeImagesData} from "../app";
import {GameController} from "../GameController";
import {H3} from "../UI/H3";
import styles from './Field.module.css'

export class Board extends Control {
	private game: GameController;
	private canvasComponent: CanvasComponent;
	onFinishedGame: (winner: string) => void
	onDeadHeat: () => void
	private yourTurn: H3;

	constructor(parent: HTMLElement, playerShape: 'circle' | 'cross', images: typeImagesData) {
		super(parent, 'div', styles.wrapper );
		const game = new GameController(playerShape)
		game.onFinishedGame = (winner: string) => this.onFinishedGame(winner)
		game.onPlayerTurn = (shape: string, coords: { x: number, y: number }) => {
			this.canvasComponent.drawShapeOnCanvas(shape, coords)
			game.botNext()
			this.yourTurn.destroy()
			this.yourTurn=null
		}
		game.onDeadHeat = () => this.onDeadHeat()
		game.onBotTurn = (shape: string, coords: { x: number, y: number }) => {
			this.canvasComponent.drawShapeOnCanvas(shape, coords)
			this.canvasComponent.listenClick()
			this.yourTurn = new H3(this.node)
		}
		this.canvasComponent = new CanvasComponent(this.node, images)
		this.canvasComponent.onClickedCell = (cell) => {
			game.clickCell(cell)
		}
		if (game.turn() === 'player') {
			this.canvasComponent.listenClick()
			this.yourTurn = new H3(this.node)
		}
	}
}
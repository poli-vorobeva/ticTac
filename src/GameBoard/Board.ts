import Control from "../controll";
import {CanvasComponent} from "./CanvasComponent";
import {typeImagesData} from "../app";
import {GameController} from "../GameController";

export class Board extends Control {
	private game: GameController;
	private canvasComponent: CanvasComponent;
	onFinishedGame:(winner:string)=>void
	onDeadHeat:()=>void
	constructor(parent: HTMLElement, playerShape: 'circle' | 'cross', images: typeImagesData) {
		super(parent, 'div', '', 'BAORD');
		const game = new GameController(playerShape)
		game.onFinishedGame=(winner:string)=>this.onFinishedGame(winner)
		game.onPlayerTurn = (shape:string,coords:{x:number,y:number}) => {
			this.canvasComponent.drawShapeOnCanvas(shape,coords)
			game.botNext()
		}
		game.onDeadHeat=()=>this.onDeadHeat()
		game.onBotTurn = (shape:string,coords:{x:number,y:number}) => {
			this.canvasComponent.drawShapeOnCanvas(shape,coords)
			this.canvasComponent.listenClick()
			new Control(this.node, 'h3', '', `It's your turn`)
		}
		//add to check if on emptyCells
		this.canvasComponent = new CanvasComponent(this.node, images)
		this.canvasComponent.onClickedCell = (cell) => {
			game.clickCell(cell)
		}
		if (game.turn() === 'player') {
			this.canvasComponent.listenClick()
			new Control(this.node, 'h3', '', `It's your turn`)
		}
	}
}
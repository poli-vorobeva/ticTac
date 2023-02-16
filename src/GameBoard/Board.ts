import Control from "../controll";
import {CanvasComponent} from "./CanvasComponent";
import {typeImagesData} from "../app";
import {GameController} from "../GameController";

export class Board extends Control {
	private game: GameController;
	private canvasComponent: CanvasComponent;

	constructor(parent: HTMLElement, playerShape: 'circle' | 'cross', images: typeImagesData) {
		super(parent, 'div', '', 'BAORD');
		const game = new GameController(playerShape)

		this.canvasComponent = new CanvasComponent(this.node, images)
		this.canvasComponent.onClickedCell=(cell)=>{
			game.clickCell(cell)
		}
		if(game.turn()==='player'){
			this.canvasComponent.listenClick()
			new Control(this.node,'h3','',`It's your turn`)
		}
		//random active attack
		//write who is active
		//you turn-> change in matrix
		//check-> is finish-> change active player
		//bot-> random cell
	}
}
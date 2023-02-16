import Control from "./controll";
import {Board} from "./GameBoard/Board";
import {ChooseShape} from "./ChooseShape/ChooseShape";

export type typeImgData = { name: 'bg' | 'circle' | 'cross', img: HTMLImageElement ,size:number}
export type typeImagesData = typeImgData[]

export class App extends Control {
	private board: Board;
	private startButton: Control<HTMLElement>;

	constructor(parent: HTMLElement, images: typeImagesData) {
		super(parent, 'div', '', 'DIV');
		this.startButton = new Control(this.node, 'button', '', 'START')

		this.startButton.node.onclick = () => {
			const chooseShape = new ChooseShape(this.node, images)
			chooseShape.onChooseShape=(shape:'circle'|'cross')=>{
				this.board = new Board(this.node, shape, images)
				chooseShape.destroy()
			}
		}
	}
}
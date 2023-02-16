import Control from "./controll";
import {Board} from "./Board";

export class App extends Control {
	private board: Board;
	private startButton: Control<HTMLElement>;
	constructor(parent: HTMLElement) {
		super(parent, 'div', '', 'DIV');
		this.board = new Board(this.node,5)
		this.startButton=new Control(this.node,'button','','START')
	}
}
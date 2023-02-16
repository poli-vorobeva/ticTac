import Control from "./controll";
import {Field} from "./Field";

export class Board extends Control {
	private matrix: number[][];
	private playerEl: number;
	private field: Field;

	constructor(parent: HTMLElement,playerEl:number) {
		super(parent, 'div', '', 'BAORD');
		this.matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
		this.playerEl=playerEl//2- circle||5-cross
		this.field=new Field(this.node)
		//random active attack
		//write who is active
		//you turn-> change in matrix
		//check-> is finish-> change active player
		//bot-> random cell
	}
}
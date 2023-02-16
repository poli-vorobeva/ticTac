import Control from "./controll";

export class Field extends Control<HTMLCanvasElement>{
	private ctx: CanvasRenderingContext2D;
	constructor(parentNode:HTMLElement) {
		super(parentNode,'canvas');
		this.node.width=300
		this.node.height=300
		this.ctx= this.node.getContext('2d')
		this.ctx.fillStyle='red'
		this.ctx.fillRect(0,0,this.node.width,this.node.width)
	}
}
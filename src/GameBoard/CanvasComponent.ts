import Control from "../controll";
import styles from './Field.module.css'
import {typeImagesData} from "../app";

export class CanvasComponent extends Control<HTMLCanvasElement> {
	private ctx: CanvasRenderingContext2D;
	onClickedCell:(cell:{x:number,y:number})=>void
	constructor(parentNode: HTMLElement, images: typeImagesData) {
		super(parentNode, 'canvas', styles.field);
		this.node.width = 300
		this.node.height = 300
		this.ctx = this.node.getContext('2d')
		this.ctx.fillStyle = 'red'
		this.ctx.fillRect(0, 0, this.node.width, this.node.width)
		images.forEach((imgD) => {
			this.ctx.drawImage(imgD.img, 0, 0, imgD.size, imgD.size)
		})
	}

	listenClick() {
		this.node.onclick=(e)=>this.onClickedCell(this.getCell(e.x,e.y))
		window.addEventListener('click',()=>console.log(window.screenX))
	}

	getCell(x:number,y:number){
		return {x:Math.floor(x / 70) - 1, y:Math.floor(y / 70) - 1}
	}
}
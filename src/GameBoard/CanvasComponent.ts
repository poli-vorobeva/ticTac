import Control from "../controll";
import styles from './Field.module.css'
import {typeImagesData} from "../app";

export class CanvasComponent extends Control<HTMLCanvasElement> {
	private ctx: CanvasRenderingContext2D;
	onClickedCell:(cell:{x:number,y:number})=>void
	private images: typeImagesData;
	constructor(parentNode: HTMLElement, images: typeImagesData) {
		super(parentNode, 'canvas', styles.field);
		this.node.width = 300
		this.node.height = 300
		this.ctx = this.node.getContext('2d')
		this.ctx.fillStyle = 'red'
		this.ctx.fillRect(0, 0, this.node.width, this.node.width)
		this.images=images
		const bg= images.find(el=> el.name=='bg')

		// images.forEach((imgD) => {
		 	this.ctx.drawImage(bg.img, 0, 0, bg.size, bg.size)
		// })
	}

	listenClick() {
		this.node.onclick=(e)=> {
			const {x,y}=this.getCoord(e)

			this.onClickedCell(this.getCell(x, y))
		}
	}
getCoord(e:MouseEvent){
	const rect = this.node.getBoundingClientRect()
	const x = e.clientX - rect.left
	const y = e.clientY - rect.top
	return{x,y}
}
	getCell(x:number,y:number){
		console.log(x,y,'------CANVAS COORD')
		console.log(x/100,y/100)

		console.log("CELL-",Math.floor(x / 100),Math.floor(y / 100))
		return {x:Math.floor(x / 100), y:Math.floor(y / 100)}
	}

	drawShapeOnCanvas(shape: string, coords: { x: number; y: number }) {
		const img =this.images.find(e=>e.name===shape)
		this.ctx.drawImage(img.img,coords.x,coords.y,img.size,img.size)
	}
}
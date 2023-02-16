import Control from "../controll";
import {typeImagesData} from "../app";
import {Shape} from "./Shape";

export class ChooseShape extends Control {
	onChooseShape:(shape:string)=>void
	constructor(parent: HTMLElement, images: typeImagesData) {
		super(parent, 'div');
		this.node.innerHTML = `<h3>Choose the shape</h3>`
		const cross = images.find(e => e.name === 'cross')
		const circle = images.find(e => e.name === 'circle')
		const crossBtn = new Shape(this.node,cross)
		crossBtn.onChooseShape=(shape)=>this.onChooseShape(shape)
		const circleBtn = new Shape(this.node,circle)
		circleBtn.onChooseShape=(shape)=>this.onChooseShape(shape)
	}
}
import Control from "../../../controll";
import {typeImagesData} from "../../../app";
import styles from '../game.module.css'
import {Shape} from "./Shape";

export class ChooseShape extends Control {
	onChooseShape:(shape:string)=>void
	constructor(parent: HTMLElement, images: typeImagesData) {
		super(parent, 'div',styles.chooseWrapper);
		this.node.innerHTML = `<h3>Choose the shape</h3>`
		const cross = images.find(e => e.name === 'cross')
		const circle = images.find(e => e.name === 'circle')
		const buttonsWrapper= new Control(this.node,'div',styles.buttonsWrapper)
		const crossBtn = new Shape(buttonsWrapper.node,cross)
		crossBtn.onChooseShape=(shape)=>this.onChooseShape(shape)
		const circleBtn = new Shape(buttonsWrapper.node,circle)
		circleBtn.onChooseShape=(shape)=>this.onChooseShape(shape)
	}
}
import Control from "../../../controll";
import {typeImgData} from "../../../app";
import styles from '../game.module.css'

export class Shape extends Control{
	onChooseShape:(shape:string)=>void
	constructor(parent:HTMLElement,imgD:typeImgData) {
		super(parent,'button',styles.chooseButton);
		this.node.appendChild(imgD.img)
		this.node.onclick=()=>this.onChooseShape(imgD.name)}
}
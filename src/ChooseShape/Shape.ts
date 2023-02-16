import Control from "../controll";
import {typeImgData} from "../app";

export class Shape extends Control{
	onChooseShape:(shape:string)=>void
	constructor(parent:HTMLElement,imgD:typeImgData) {
		super(parent,'button');
		this.node.appendChild(imgD.img)
		this.node.onclick=()=>this.onChooseShape(imgD.name)}
}
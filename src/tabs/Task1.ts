import Control from "../controll";

export default class Task1 extends Control {
	constructor(parent: HTMLElement) {
		super(parent);
		new Control(this.node, 'h3', '', 'task1')
	}
}
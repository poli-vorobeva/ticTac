import Control from "../controll";

export class Button extends Control {
	onStartGame: () => void
	constructor(parent: HTMLElement) {
		super(parent, 'button', '', 'START');
		this.node.onclick = () => this.onStartGame()
	}
}
import Control from "../controll";

export class NavComponent extends Control{
	onUpdateTab:(tab:string)=>void
	constructor(parent:HTMLElement) {
		super(parent,'nav')
		const navLinks = {'Task 1': 'task1', 'Task 2': 'task2', 'Task3': 'task3', 'Tic Tac Toe': 'game'}
		Object.entries(navLinks).forEach(l => {
			const navItem = new Control(this.node, 'li', '', l[0])
			navItem.node.onclick = () => this.onUpdateTab(l[1])})
	}
}
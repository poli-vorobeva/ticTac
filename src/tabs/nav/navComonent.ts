import Control from "../../controll";
import styles from './nav.module.css'

export class NavComponent extends Control{
	onUpdateTab:(tab:string)=>void
	constructor(parent:HTMLElement) {
		super(parent,'nav',styles.nav)
		const navLinks = {'Task 1': 'task1', 'Task 2': 'task2', 'Task3': 'task3', 'Tic Tac Toe': 'game'}
		const wrapper = new Control(this.node,'ul',styles.ul)
		Object.entries(navLinks).forEach(l => {
			const navItem = new Control(wrapper.node, 'li', styles.li, l[0])
			navItem.node.onclick = () => this.onUpdateTab(l[1])})
	}
}
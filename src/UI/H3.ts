import Control from "../controll";
import styles from './styles.module.css'

export class H3 extends Control{
	constructor(parent:HTMLElement) {
		super(parent,'h3',styles.boardH3,`It's your turn`);
	}
}
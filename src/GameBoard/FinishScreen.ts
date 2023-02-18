import Control from "../controll";
import styles from './Field.module.css'

export class FinishScreen extends Control{
	constructor(parent:HTMLElement,text:string) {
		super(parent,'h2',styles.finishScreen,text);

	}
}
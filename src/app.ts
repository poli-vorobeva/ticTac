import Control from "./controll";
import {Board} from "./GameBoard/Board";
import {ChooseShape} from "./ChooseShape/ChooseShape";
import {Game} from "./tabs/Game";
import Task3 from "./tabs/Task3";
import Task2 from "./tabs/Task2";
import Task1 from "./tabs/Task1";
import {NavComponent} from "./tabs/navComonent";

export type typeImgData = { name: 'bg' | 'circle' | 'cross', img: HTMLImageElement, size: number }
export type typeImagesData = typeImgData[]

export class App extends Control {
	private images: typeImagesData;
	private activeTab: string;
	private game: Game;
	private taskThree: Task3;
	private taskTwo: Task2;
	private taskOne: Task1;

	constructor(parent: HTMLElement, images: typeImagesData) {
		super(parent, 'div');
		this.images = images
		this.activeTab = 'game'
		this.nav()
		this.drawContent()
	}

	nav() {
		const nav = new NavComponent(this.node)
		nav.onUpdateTab = (tab) => {
			this.activeTab = tab
			this.drawContent()
		}
	}

	drawContent() {
		this.clear()
		this.activeTab === 'game' && this.gameCycle()
		this.activeTab === 'task3' && this.task3()
		this.activeTab === 'task2' && this.task2()
		this.activeTab === 'task1' && this.task1()
	}

	clear() {
		this.game && this.game.destroy()
		this.taskThree && this.taskThree.destroy()
		this.taskTwo && this.taskTwo.destroy()
		this.taskOne && this.taskOne.destroy()
	}

	task1() {
		this.taskOne = new Task1(this.node)
	}

	task2() {
		this.taskTwo = new Task2(this.node)
	}

	task3() {
		this.taskThree = new Task3(this.node)
	}

	gameCycle() {
		this.game = new Game(this.node, this.images)
	}
}
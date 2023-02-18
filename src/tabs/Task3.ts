import Control from "../controll";
import styles from './task3.module.css'

export default class Task3 extends Control {
	constructor(parent: HTMLElement) {
		super(parent, 'div', styles.task3);
		const dags = [
			{
				text: 'раздел-единый аккаунт (на 420px ) - cдвигаются картинки',
				photo: 'account'
			},
			{
				text: 'пропадает кнопка прокрутки вверх ( меньше 800px)',
				photo: 'scroll'
			},
			{
				text: 'в разделе галлерея обрезается вторая картинка, можно сделать слайдер( меньше 800px)',
				photo: 'gallery'
			},
			{
				text: 'баннеры в самом верху- не работает кнопка play- вводит в заблуждение. По клику просто открывается картинка( меньше 500px)',
				photo: 'banner'
			}]
		const inHtml = `Теги скрипт находятся внутри блоков див *
	 В некоторых местах див обернут в див, без функциональности*
	Теги скрипт лежит в дивах по документу`
		new Control(this.node, 'h3', '', ` Рассмотрите и сделайте анализ страницы «Об игре», перечислите ошибки в дизайне, вёрстке, как это можно улучшить, почему и какой эффект от улучшения можно получить.`)
		const bagsWrapper = new Control(this.node, 'div', styles.bgsWrpr)
		dags.forEach(b => {
			const bagWrapper = new Control(bagsWrapper.node, 'figure', styles.figure)
			const img: Control<HTMLImageElement> = new Control(bagWrapper.node, 'img')
			img.node.src = `./public/assets/${b.photo}.png`
			img.node.width = 200
			const figcaption = new Control(bagWrapper.node, 'figcaption', '', b.text)
		})
		const htmlWr= new Control(this.node,'div',styles.inHt)
		new Control(htmlWr.node,'h4','','В Верстке: ')
		inHtml.split('*').forEach(el=>{
			new Control(htmlWr.node,'p','',el)
		})
	}
}
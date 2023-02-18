import Control from "../controll";
import styles from './task2.module.css'

export default class Task2 extends Control {
	constructor(parent: HTMLElement) {
		super(parent,'div',styles.task2Wrapper);
		const title=`Сравните две статьи (одна поновее, вторая — прошлогодняя) и расскажите, что изменилось в лучшую или худшую сторону, поделитесь своими общими впечатлениями, скажите, что вы оставили бы, а что стоит изменить (и почему)`
		const data=[
			{link: 'https://korabli.su/ru/news/game-updates/update-0910-american-battleships/',
				description:`На мой взгляд слишком большая вступительная часть. Я бы не стала скроллить до новости,хотелось бы, чтобы хоть
	мини-кусочек ее было видно сразу. Один из двух баннеров
	я бы убрала, или если они важны, то можно было бы сделать их бесконечным слайером со сменой кадров по таймеру * 
	Для меня- новость слишком длинная- я бы разбила ее на подразделы, что-то вроде раскрывающихся подразделов, так как 
	очень много текста и картинок, там более, что явно можно выделить логические блоки`},
			{link:'https://korabli.su/ru/news/game-updates/update-01111-new-year/',
				description: `Мне не нравится меню между баннерами, оно теряется между ними. непонятно, что оно относится к новости.
		Я бы по прежнему- убрала один баннер. и меню перенесла к новости, тогда бы понятнее * 
		Я думаю, что кнопки слайдера, не должны наезжать на футер`}
		]
		new Control(this.node, 'h3', '', title)
		data.forEach(d=>{
			const wr= new Control(this.node,'div',styles.itemWrapper)
			const link = new Control(wr.node,'p','',d.link)
			const desc= new Control(wr.node,'div')
			d.description.split('*').forEach(s=>{
				new Control(desc.node,'p','',s)
			})

		})
	}
}
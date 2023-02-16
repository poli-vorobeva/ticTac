import {App, typeImagesData} from "./app";

console.log("Hello World!");


function imageObj(data:{name:string,size:number}) {
	return new Promise((res, rej) => {
		const image = new Image()
		image.src = 	`./public/assets/${data.name}.png`
		image.width = data.size
		image.height = data.size
		image.onload = () => {
			res({name:data.name, size:data.size,img:image})
		}
	})
}

const imgNames = [{name:'bg',size:300}, {name:'circle',size:70}, {name:'cross',size:70}]
const preload = () => {
	return new Promise((res, rej) => {
		const all = Promise.all(imgNames.map(c =>(imageObj(c))))
		all.then(i => res(i))
	})
}
preload().then((d:typeImagesData) => {
	console.log(d,'$$$')
	const app = new App(document.body,d)
})



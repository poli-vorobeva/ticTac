export class IBot {
	onBotTurn:(cellIndx:number)=>void
	randomCell(size: number) {
		return Math.floor(Math.random() * size)
	}

	turn(emptyCells: Set<string>) {
		console.log('bot turn')
		setTimeout(()=> {
			this.onBotTurn(this.randomCell(emptyCells.size))
		},1000)
	}
}
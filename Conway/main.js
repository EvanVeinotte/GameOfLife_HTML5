CANVAS = document.getElementById("canvas");
CTX = CANVAS.getContext("2d");
FRAMERATE = 30;
counter = 0;
running = false;

window.onload = function(){
	CANVAS.addEventListener("click", click);
	setInterval(update, 1000/FRAMERATE);
}

class Cell {
	constructor (gridpos){
		this.alive = false;
		this.pos = [gridpos[0] * cellsize, gridpos[1] * cellsize];
		this.gridpos = gridpos;
	}

	checkNeighbors (){

		let neighbors = 0;
		let x = this.gridpos[0];
		let y = this.gridpos[1];

		/*
			Start at top left then turn clockwise			
		*/
		try{
			if (gridarray[y-1][x-1].alive == true){
				neighbors += 1;
			}
		}catch(err){}

		try{
			if (gridarray[y-1][x].alive == true){
				neighbors += 1;
			}
		}catch(err){}

		try{
			if (gridarray[y-1][x+1].alive == true){
				neighbors += 1;
			}
		}catch(err){}

		try{
			if (gridarray[y][x-1].alive == true){
				neighbors += 1;
			}
		}catch(err){}

		try{
			if (gridarray[y][x+1].alive == true){
				neighbors += 1;
			}
		}catch(err){}

		try{
			if (gridarray[y+1][x-1].alive == true){
				neighbors += 1;
			}
		}catch(err){}

		try{
			if (gridarray[y+1][x].alive == true){
				neighbors += 1;
			}
		}catch(err){}

		try{
			if (gridarray[y+1][x+1].alive == true){
				neighbors += 1;
			}
		}catch(err){}

		//
		let bealive = this.alive;

		if (neighbors < 2){
			bealive = false;
		}else if (neighbors == 3){
			bealive = true;
		}else if (neighbors > 3){
			bealive = false;
		}

		return bealive;
	}
}

let bg = new Image();
bg.src = "tentwentyfour.png";

let texty = "";
texty.src = "test.txt";

console.log(texty);

const cellsize = 16;
const simspeed = 4 //2 generations per second

let gridarray = [];
createGrid();

function update(){
	CTX.fillStyle = "#eaeaea";
	CTX.fillRect(0,0,CANVAS.width,CANVAS.height);
	

	CTX.fillStyle = "#444444";

	for (r = 0; r < CANVAS.height/cellsize; r++){
		for (c = 0; c < CANVAS.width/cellsize; c++){
			if(gridarray[r][c].alive){
				
				CTX.fillRect(gridarray[r][c].pos[0], gridarray[r][c].pos[1], cellsize, cellsize);
			}
		}
	}
	CTX.drawImage(bg,0,0);
	//checking when to run next gen

	if (running == true){
		if (counter >= FRAMERATE / 2){
			counter = 0;
			nextGen();
		}else{
			counter++;
		}
	}
}

function click(ms){
	xGridPos = Math.floor(ms.offsetX/cellsize);
	yGridPos = Math.floor(ms.offsetY/cellsize);

	//within grid
	if (xGridPos < CANVAS.width/cellsize && yGridPos < CANVAS.height/cellsize)
	{
		gridarray[yGridPos][xGridPos].alive = !gridarray[yGridPos][xGridPos].alive;
	}
	
}

function createGrid(){
	let width = CANVAS.width/cellsize;
	let height = CANVAS.height/cellsize;

	for (r = 0; r < height; r++){
		let rowarray = [];
		for (c = 0; c < width; c++){
			rowarray.push(new Cell([c,r]));
		}
		gridarray.push(rowarray);
	}
}

function nextGen(){
	let newgridlives = [];

	for (r = 0; r < CANVAS.height/cellsize; r++){
		let rowarray = [];
		for (c = 0; c < CANVAS.width/cellsize; c++){
			rowarray.push(gridarray[r][c].checkNeighbors());
		}
		newgridlives.push(rowarray);
	}
	for (r = 0; r < CANVAS.height/cellsize; r++){
		for (c = 0; c < CANVAS.width/cellsize; c++){
			gridarray[r][c].alive = newgridlives[r][c];
		}
	}
}

function stepClicked(){

	nextGen();

}

function clearClicked(){
	let width = CANVAS.width/cellsize;
	let height = CANVAS.height/cellsize;

	for (r = 0; r < height; r++){
		for (c = 0; c < width; c++){
			gridarray[r][c].alive = false;
		}
	}
}

function startClicked(){
	running = true;
	counter = 0;
}

function stopClicked(){
	running = false;
}
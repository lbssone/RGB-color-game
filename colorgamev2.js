var numOfSquares = 6;
var colors = [];  //*
var pickedColor; //* 
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");  //*

init();

function init(){
	setupModeButtons();  
	setupSquares();
	reset();
}

resetBtn.addEventListener("click", function(){
	reset();
});

// *mode buttons event listeners*
function setupModeButtons(){
	modeButtons[1].classList.add("selected");
	for(var i=0; i<modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
 			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");

			if(this.textContent === "Easy"){
				numOfSquares = 3;
			}else if(this.textContent === "Medium"){
				numOfSquares = 6;
			}
			else{
				numOfSquares = 9;			
			}
			// this.textContent === "Easy" ? numOfSquares = 3: numOfSquares = 6;  // 這行可以代替上面那四行
		  reset();
		});
	}
}

// *square buttons event listeners*
function setupSquares(){
	for(var i=0; i<squares.length; i++){
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare color to pickedColor
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetBtn.textContent = "PLAY AGAIN";
			}else{
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

function reset(){
	resetBtn.textContent = "NEW COLORS";
	h1.style.backgroundColor = "#238ec4";
	messageDisplay.textContent = "";
  //generate all new colors
  colors = generateRandomColors(numOfSquares);
  //pick a new random color from array
  pickedColor = pickColor();
  //change clorDisplay to match pickedColor
  colorDisplay.textContent = pickedColor;
  //change colors of squares
  for(var i=0; i<squares.length; i++){
  	if(colors[i]){
  		squares[i].style.display = "block";  //只要有colors[i]就要讓它顯示出來。block:以區塊的方式呈現(div, p, ul, li)都屬於block
  		squares[i].style.backgroundColor = colors[i];
  	}else{
      squares[i].style.display = "none";
  	}
	} 
}

function changeColors(color){
	for(var i=0; i<squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

// 
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);  //Math.random 會pick 0~1 之間(不包括1)的任一數(所以乘以6的話就會得到0~5.99...), Math.floor會把小數點後面的東西都捨去
	return colors[random]
}

function generateRandomColors(num){
	//make an array
  var arr = [];
	//add num random colors to array
	for(var i=0; i<num; i++){
		//get random color and push into arr
		arr.push(randomColor());
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a "red" from 0-255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0-255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0-255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")"; 
}
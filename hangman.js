var inquirer = require("inquirer");




var listOfWords =['chicago', 'detroit', 'michigan','texas','washington','aspen','denver']
var game






function startGame () {
inquirer
  .prompt({
      name: "confirm",
      type: "confirm",
      message: "Would you like to start a new game?",
			})
       .then( function (answer) {
       	if(answer.confirm) {
       		createGame()
       	}
      });
}


function createGame() {
	game = new Game (listOfWords[0])
	game.display()
	listOfWords.shift();
	letterGuess ()
}


function letterGuess () {
inquirer
  .prompt({
      name: "letter",
      type: "input",
      message: "Guess a letter",
			})
       .then( function (answer) {
       	game.letter(answer.letter)
      });
}



function winWindow() {
inquirer
  .prompt({
      name: "letter",
      type: "confirm",
      message: "Congratulations, you won. Would you like to play a new game?",
			})
       .then( function (answer) {
       	createGame()
      });
}




var Game = function (wordToGuess) {
	this.wordToGuess = wordToGuess
	this.wordToDisplay = ''
	this.guessedLetters = []
	this.guessCount = 15
	this.incorrectGuesses = 0
	this.win = false
	this.createWord = function () {
		this.wordToDisplay = ''
		this.win = true
		for (var i = 0;  i<wordToGuess.length; i++)
			{
				if (checkIfExist(this.guessedLetters,this.wordToGuess[i]) && this.guessedLetters.length>0) {
					this.wordToDisplay=this.wordToDisplay + this.wordToGuess[i];
				}
				else {
					this.wordToDisplay=this.wordToDisplay + "-";
					this.win = false
				}
			}

	}


	this.display = function () {
		this.createWord();
		console.log("\n\n\n\n\n\n\n")
		console.log(`Word to guess:`);
		console.log("\n")
		console.log(`       ${game.wordToDisplay}`)
		console.log("\n")
		console.log(`Letters guessed: ${game.guessedLetters}`)
		console.log("\n\n\n\n\n\n\n")
	}


	this.letter = function (letr) {
		if(letr.length>1 || letr.length===0) {
			console.log("Guess one letter at a time")
			letterGuess ()
		} else {
			if(checkIfExist(this.guessedLetters,letr) && this.guessedLetters.length>0) {
				console.log("You already guessed this letter");
				letterGuess ()
			} else {
				this.guessedLetters.push(letr)
				game.display()
				if (this.win) {	winWindow()} else {	letterGuess ()}
			}
		}
	}
}


function checkIfExist (arr, val){
	return arr.some(function(arrVal){
		return val.toLowerCase()===arrVal.toLowerCase();
	});
}

startGame()

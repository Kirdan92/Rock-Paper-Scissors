'use strict';
(function () {
	//Variables declaration
	var newGameBtn = document.getElementById("new-game-btn");
	var btnYes = document.getElementById("btn-yes");
	var modals = document.querySelectorAll('.modal');
	var getValuesBtn = document.getElementById("getValuesBtn");
	var playerName, winningPoints;
	var rockBtn = document.getElementById("rock");
	var paperBtn = document.getElementById("paper");
	var scissorsBtn = document.getElementById("scissors");
	var pointsH2 = document.getElementById("points");
	var computerMovevar = '';
	var textcompScore =document.getElementById("computer-points");
	var textplayerScore = document.getElementById("player-points");
	var output = document.getElementById("move-output");
	var outputInfo = document.getElementById("move-output-container");
	var resultContainer = document.getElementById("result-container");
	var compPick = '';
	var resultMove = '';
	var row, cell, textNode, prop = ['round','playerMove', 'computerMove', 'roundResult', 'score'];
	var table = document.getElementById("game-details");
	var params = {playerName: "You", winScore: 0, compScore: 0, playerScore: 0, roundsPlayed: 0, progress: []}

	  

	var moveObj = {
		pm: "",	
	    win: "",
	    lose : "",
	    compareMoves: function (cM) {
	    	if (cM == this.win) {
	    		document.getElementsByClassName("text-container")[0].innerHTML += params.playerName + " gets a point" + "<br>";
	    		params.playerScore ++;
	    		textplayerScore.innerText = params.playerScore;
	    		resultMove = params.playerName +' gets a point';
	    	} else if (cM == this.lose) {
	    		document.getElementsByClassName("text-container")[0].innerHTML += "Point for Computer" + "<br>";
	    		params.compScore ++;
	    		textcompScore.innerText = params.compScore;
	    		resultMove = 'Computer gets a point';
	    	} else {
	    		document.getElementsByClassName("text-container")[0].innerHTML += "DRAW" + "<br>";
	    		resultMove = 'DRAW';
	    	}
	    }
	};

//---------------------Events---------------------
	newGameBtn.addEventListener("click", newGame);
	btnYes.addEventListener("click", newGame);

	getValuesBtn.addEventListener("click", getValues);

	var playerMoves = document.querySelectorAll(".player-move");

	  for(var i = 0; i < playerMoves.length; i++){
	  	var thisButton = playerMoves[i];
	    thisButton.addEventListener('click', function(event){
	    	var moveAttr = this.getAttribute("data-move");
	    	console.log(moveAttr);	
	    	playerMove(moveAttr);
    	});
	  }
//-----------------------Functions----------------------------------
	
	function getValues() {
		playerName = document.getElementById("playerName").value
		winningPoints = document.getElementById("winningPoints").value	
		startGame(playerName, winningPoints);
	}
	function startGame(playerName, winningPoints){
		document.querySelector('#modal-overlay').classList.remove('show');
		document.querySelector('#new-game-modal').classList.remove('show');
		params.winScore = winningPoints;
		params.playerName = playerName;
		if(isNaN(params.winScore) || params.winScore == null || params.winScore === ''){   
			console.log("incorrect value" + ' ' + params.winScore);
	    } else{
	    	outputInfo.classList.remove("warning");
	    	outputInfo.classList.remove("success");
	    	output.innerText = "Pick your move";
	    	pointsH2.innerText = params.winScore;
	    	textplayerScore.innerText = 0;
			textcompScore.innerText = 0;
			params.compScore = 0;
			params.playerScore = 0;
			params.roundsPlayed = 0;
			resultContainer.innerText = '';
			params.progress = [];
			document.querySelector('#modal-overlay').classList.remove('show');
			//removing rows from detail
			for( var k = table.rows.length -1; k > -1; k--){
				table.deleteRow(k);
			}
	   } 

	}
	function newGame(){
		for(var i = 0; i < modals.length; i++){
			modals[i].classList.remove('show');
		}
		winningPoints = document.getElementById("winningPoints").value = 1;
		document.querySelector('#modal-overlay').classList.add('show');
		document.getElementById('new-game-modal').classList.add('show');
		//params.winScore =  window.prompt('Please enter amount of points needed to win');
	}

	function computerMove() {
		var randomFigure = Math.floor(Math.random() * (3 - 1 + 1)) + 1;	
		var cMoveDisplay = document.getElementById("computer-move-text");
		var compIcons = document.getElementsByClassName("comp-pick");
		for (var i = 0; i < compIcons.length; i++) {
			compIcons[i].classList.add('hide-comp-move');
		}
		if (randomFigure === 1){
			computerMovevar = 'r';
			console.log("Computer: Rock");
			cMoveDisplay.innerText = "Computer plays: Rock";
			document.getElementsByClassName("text-container")[0].innerHTML += "Computer: Rock vs ";
			compPick = 'Rock';
			document.getElementById("compRock").classList.remove("hide-comp-move");
		} else if (randomFigure === 2) {
			computerMovevar = 'p';
			console.log("Computer: Paper");
			document.getElementsByClassName("text-container")[0].innerHTML += "Computer: Paper vs ";
			cMoveDisplay.innerText = "Computer plays: Paper";
			compPick = 'Paper';
			document.getElementById("comPaper").classList.remove("hide-comp-move");
		} else if (randomFigure === 3) {
			computerMovevar = 's';
			console.log("Computer: Scissors");
			document.getElementsByClassName("text-container")[0].innerHTML += "Computer: Scissors vs ";
			cMoveDisplay.innerText = "Computer plays: Scissors";
			compPick = 'Scissors';
			document.getElementById("compScissors").classList.remove("hide-comp-move");
		} else {
			console.log("error");
		}
	}

	function playerMove(move) {
		if (isNaN(params.winScore) || params.winScore === 0 || params.winScore == null || params.winScore === ''){
			console.log("Please click New Game button to set up winning score");
			document.getElementsByClassName("text-container")[0].innerHTML += "Please click New Game button to set up winning score" + "<br>";
			return;
		} else {
			computerMove();		
			if (move == "rock"){
				console.log("Player: Rock");
				document.getElementsByClassName("text-container")[0].innerHTML += params.playerName + ": Rock" + "<br>";
				moveObj['pm'] = 'r';	
				moveObj['win'] = 's';	
				moveObj['lose'] = 'p';	
				moveObj.compareMoves(computerMovevar);
				output.innerText = "Rock vs " + compPick;
				document.getElementById("result-container").innerText = resultMove;
			} else if (move == "paper") {
				console.log("Player: Paper");
				document.getElementsByClassName("text-container")[0].innerHTML += params.playerName + ": Paper" + "<br>";
				moveObj['pm'] = 'p';	
				moveObj['win'] = 'r';	
				moveObj['lose'] = 's';
				moveObj.compareMoves(computerMovevar);	
				output.innerText = "Paper vs " + compPick;
				document.getElementById("result-container").innerText = resultMove;
			} else if (move == "scissors") {
				console.log("Player: Scissors");
				document.getElementsByClassName("text-container")[0].innerHTML += params.playerName + ": Scissors" + "<br>";
				moveObj['pm'] = 's';	
				moveObj['win'] = 'p';	
				moveObj['lose'] = 'r';
				moveObj.compareMoves(computerMovevar);	
				output.innerText = "Paper vs " + compPick;
				document.getElementById("result-container").innerText = resultMove;
			} else {
				console.log("error");
			}
		}	
//Adding data to object params
		params.roundsPlayed ++;
		console.log("Rounds played: " + params.roundsPlayed);
		var gameData = {playerMove: move, computerMove: compPick, round: params.roundsPlayed, roundResult: resultMove, score: [params.playerScore, params.compScore]}	
		params.progress.push(gameData);	
		checkWin(params.winScore, params.playerScore, params.compScore);
	}

	function printDetails() {
		for(var i = 0; i < params.progress.length; i++){
			row = document.createElement('tr');
			for (var j = 0; j < 5; j++){
			cell = document.createElement('td');
			textNode = document.createTextNode(params.progress[i][prop[j]]);
			cell.appendChild(textNode);
			row.appendChild(cell);
		}
			table.appendChild(row);	
		}

	}
	function checkWin (winScore, playerScore, computerScore) {
		if(params.winScore == params.playerScore || params.winScore < params.playerScore) {
			console.log("Player Wins the game");		
			document.getElementById("move-output-container").classList.add("success");
			output.innerText = params.playerName + " Win";
			showModal("player");
			resultContainer.innerText = '';
			var cMoveDisplay = document.getElementById("computer-move-text").innerText = "";			
			printDetails();
			reset();
			console.log(params.progress);
		} else if (params.winScore == computerScore || params.winScore < computerScore) {
			console.log("Computer Wins the game");
			document.getElementById("move-output-container").classList.add("warning");
			output.innerText = "You Lose, try again?"
			showModal("computer");
			resultContainer.innerText = '';
			var cMoveDisplay = document.getElementById("computer-move-text").innerText = "";
			printDetails();
			reset();
		} else {
			console.log("Keep playing");
		}
	}

	function reset() {
		params.winScore = 0;
		var compIcons = document.getElementsByClassName("comp-pick");
		for (var i = 0; i < compIcons.length; i++) {
			compIcons[i].classList.add('hide-comp-move');
		}
	}

//---------------------------------Modals----------------------------------------
	var showModal = function(gameResult){
		document.querySelector('#modal-overlay').classList.add('show');
		document.getElementById('game-result').classList.add('show');
		document.getElementById('modal-details').classList.add('show');
		if(gameResult == "player") {
			document.querySelector("#game-result .content p").innerHTML = params.playerName +" Win";
		} else {
			document.querySelector("#game-result .content p").innerHTML ="You Lose, try again?";
		}
	};
	

	var modalLinks = document.querySelectorAll('.show-modal');
	
	for(var i = 0; i < modalLinks.length; i++){
		modalLinks[i].addEventListener('click', showModal);
	}
	


	var hideModals = function(event) {
		document.querySelector('#modal-overlay').classList.remove('show');
		for(var i = 0; i < modals.length; i++){
			modals[i].classList.remove('show');
		}
	}
	var noBtn = document.querySelector("#btn-no");
	noBtn.addEventListener('click', hideModals);
	
	var hideModal = function(event){
		event.preventDefault();
		document.querySelector('#modal-overlay').classList.remove('show');
	};
	
	var closeButtons = document.querySelectorAll('.modal .close');
	
	for(var i = 0; i < closeButtons.length; i++){
		closeButtons[i].addEventListener('click', hideModal);
	}
	
	document.querySelector('#modal-overlay').addEventListener('click', hideModal);

	var modals = document.querySelectorAll('.modal');
	
	for(var i = 0; i < modals.length; i++){
		modals[i].addEventListener('click', function(event){
			event.stopPropagation();
		});
	}
 })();
document.addEventListener('DOMContentLoaded', () => {
	
	// tar en array av element och shufflar randomly
	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	// variabler
	var i,
		alphabet, 
		newAlphabet,
		letters, 
		letter,
		themeId,
		themeText, 
		theWord;

	var space = "_",
		hiddenWord = "",
		count = 0,
		fail = 0,
		alphabetArray = [], 
		hiddenWordSplit = [],
		theWordSplit = [];

	var themes = document.querySelectorAll(".theme"),
		wordDisplayed = document.getElementById("word_display"),
		keybordDisplay = document.getElementById("keybord"),
		resultDisplay = document.getElementById("result_display"),
		themeButton = document.querySelector(".choose_theme"),
		themeDisplay = document.getElementById("theme_display"),
		newGameButton = document.querySelector(".new_game");


		//förgjorda ord samt descriptions

		var guessWord = [
			{
			  theme: "Easy",
			  word: [
				{ word: "string", description: "Variable that stores text" },
				{ word: "int", description: "Variable that stores whole numbers" },
				{ word: "double", description: "Variable that can store 64 bits, and is more precise" },
				{ word: "loop", description: "A sequence that is continually repeated" },
				{ word: "return", description: "A statement that ends the execution of a function" },
				{ word: "boolean", description: "A data type that represents true or false values" }
			  ]
			},
			{
			  theme: "Medium",
			  word: [
				{ word: "array", description: "A collection of data that can hold multiple values of the same type" },
				{ word: "object", description: "A data type that stores data in key-value pairs" },
				{ word: "method", description: "Block of code that performs a task" },
				{ word: "class", description: "Blueprint for creating objects" },
				{ word: "collection", description: "Group of objects that can be treated as a single entity" }
			  ]
			},
			{
			  theme: "Hard",
			  word: [
				{ word: "interface", description: "Collection of abstract methods that define a contract" },
				{ word: "inheritance", description: "Mechanism that allows one class to inherit properties and behaviors of another" },
				{ word: "exception", description: "Error that occurs during program execution" },
				{ word: "package", description: "Way to organize classes and interfaces into namespaces" },
				{ word: "thread", description: "Lightweight process that runs concurrently with other threads" }
			  ]
			}
		  ];
		  



	// funktion som kör scriptet såfort sidan laddats,  samt lägger till en eventlistener till tema knapparna
	window.onload = function(){
		themes.forEach(theme => theme.addEventListener("click", startGame));
		newGameButton.style.display = "none";
		keybordDisplay.style.display = "none";
		themeDisplay.style.display = "none";
		document.getElementById("gameplan").style.display = "flex";

	};

	// sätter temat och väljer en ett random ord genom shuffle funktionen
	function startGame() {
		newGameButton.style.display = "inline";
		themeDisplay.style.display = "inline";
		themeId = this.getAttribute("value");
		themeText = this.innerHTML;
		themeDisplay.innerHTML += "Theme: " + themeText;
		shuffle(guessWord[themeId].word);
		theWord = guessWord[themeId].word[0].word.toUpperCase();
		wordDescription = guessWord[themeId].word[0].description;
		displayWord();
		document.getElementById("word_description").innerHTML = wordDescription;
	  }
	  

	// displayar ordet genom antalet bokstäver i form av "_"
	function displayWord() {
		themeButton.style.display = "none";
		keybordDisplay.style.display = "block";
		theWordSplit = theWord.split("");
		for (i = 1; i <= theWord.length; i++){
			hiddenWord = hiddenWord + space;
		}
		hiddenWordSplit = hiddenWord.split("");
		for (i = 0; i < theWordSplit.length; i++) {
			if (theWordSplit[i] === " ") {
				theWordSplit[i] = "&nbsp;";
				hiddenWordSplit[i] = "&nbsp;";
				count++;
			}
		}
		wordDisplayed.innerHTML = hiddenWordSplit.join("&#160;");
	}

	// displayar tagentbordet, använt engelsk input keyboard
	function keyboard(){
		alphabet = "azertyuiopqsdfghjklmwxcvbn ";
		newAlphabet = alphabet.toUpperCase();
		alphabetArray = newAlphabet.split('');
		for (i = 0; i < alphabetArray.length-1; i++) {
			if (alphabetArray[i] == " ") {
				alphabetArray[i] = "&nbsp;";
			}
			keybordDisplay.innerHTML += '<button type="button" class="letter">' 
				+ alphabetArray[i] + "</button>";
			if (i == 9 || i == 19) {
				keybordDisplay.innerHTML += "<br>";
			}	
		}
		letters = document.querySelectorAll(".letter");
		letters.forEach(letter => letter.addEventListener("click", pressedKey));
	}
	keyboard();

	// samlar använda bokstäver samt disablar dem och lägger till mörk bakgrund (css)
	function pressedKey(){
		letter = this.innerHTML;
		this.setAttribute("disabled", "");
		checkMatch();
	}

	// kollar om bokstäver matchar ordet
	function checkMatch() {
		if (theWordSplit.indexOf(letter) == -1) {
			fail++;
			drawHangman();
			if (fail == 6) { //vid förlust
				resultDisplay.innerHTML = "<span style='color: orange;'>> Game over!</span>";
				endGame();
			}
		}
		for (i = 0; i < theWord.length; i++) {
			if (theWordSplit[i] === letter) {
				count++;
				hiddenWordSplit[i] = letter; 
			} 
			wordDisplayed.innerHTML = hiddenWordSplit.join("&#160;");
		}
		if (count === theWord.length) { //vid vinst
			resultDisplay.innerHTML = "<span style='color: greenyellow;'>> You win!</span>";
			endGame();
		}
	}
	
	// Rita hangman om fel bokstav valts, detta görs genom switchstatements där man gör blocken visible
	function drawHangman(){
		switch (fail) {
			case 0:
				document.querySelector(".deadguy.head").style.visibility = "hidden";
				document.querySelector(".deadguy.body").style.visibility = "hidden";
				document.querySelector(".deadguy.right-arm").style.visibility = "hidden";
				document.querySelector(".deadguy.left-arm").style.visibility = "hidden";
				document.querySelector(".deadguy.left-leg").style.visibility = "hidden";
				document.querySelector(".deadguy.right-leg").style.visibility = "hidden";
				break;
			case 1: document.querySelector(".deadguy.head").style.visibility = "visible";
				break;
			case 2: document.querySelector(".deadguy.body").style.visibility = "visible";
				break;
			case 3: document.querySelector(".deadguy.right-arm").style.visibility = "visible";
				break;
			case 4: document.querySelector(".deadguy.left-arm").style.visibility = "visible";
				break;
			case 5: document.querySelector(".deadguy.left-leg").style.visibility = "visible";
				break;
			case 6: document.querySelector(".deadguy.right-leg").style.visibility = "visible";
				break;
			default:
				break;
		}
	}
	drawHangman();

	// avslutar spelet
	function endGame(){
		newGameButton.style.display = "inline";
		letters.forEach(letter => letter.removeEventListener("click", pressedKey));
	}
	
	// starta en match, resetar alla fails counts och allt
	newGameButton.addEventListener("click", newGame);
	function newGame(){
		fail = 0;
		count = 0;
		theWordSplit = [];
		hiddenWordSplit = [];
		wordDisplayed.innerHTML = "";
		resultDisplay.innerHTML = "";
		themeDisplay.innerHTML = "";
		space = "_";
		hiddenWord = "";
		themeButton.style.display = "block";
		keybordDisplay.style.display = "none";
		newGameButton.style.display = "none";
		document.getElementById("word_description").innerHTML = "";
		letters.forEach(function(letter){letter.removeAttribute("disabled", "")});
		letters.forEach(letter => letter.addEventListener("click", pressedKey));
		drawHangman();
	}
});


function game_back2()
{
	window.location.href = "hangman.html";
}
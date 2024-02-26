//Alexander Pavlovic alpa7946

function mathGame(min, max, operator) {
  // generare 2 random siffror mellan min och max
  var num1 = Math.floor(Math.random() * (max - min + 1)) + min;
  var num2 = Math.floor(Math.random() * (max - min + 1)) + min;
  
  // generar ekvationen baserad på operatorn
  var equation = num1 + " " + operator + " " + num2 + " = ?";
  
  // lagrar rätt svar
  var answer;
  if (operator === "+") {
    answer = num1 + num2;
  } else if (operator === "-") {
    answer = num1 - num2;
  } else if (operator === "*") {
    answer = num1 * num2;
  } else if (operator === "/") {
    answer = num1 / num2;
  }
  
  // retunerar ekvationen och svaret
  return [equation, answer];
}

//förbestämda variabler
let currentEquation;
let currentAnswer;
let currentOperator;
let currentScore = 0;
let currentLives = 3;
let currentSkip = 3;

//starta spelet + val av operator

//gömmer och display grejer
function startGame(operator) {
document.getElementById("operatorButtons").style.display = "none";
document.getElementById("math_game").style.display = "flex";
document.getElementById("math-restart-btn").style.display = "block";
document.getElementById("exit-info").style.display = "none";
document.getElementById("reseter").style.display = "none";


currentOperator = operator;
let game = mathGame(1,10, currentOperator);
currentEquation = game[0];
currentAnswer = game[1];
document.getElementById("equation").innerHTML = currentEquation;
document.getElementById("answer").value = "";
document.getElementById("result").innerHTML = "";
}

//kontrollerar svaret
function checkAnswer() {
let userAnswer = document.getElementById("answer").value;
if (userAnswer == currentAnswer) {
document.getElementById("result").innerHTML = "Correct!";
currentScore++;
document.getElementById("score").innerHTML = "Score: " + currentScore;
if (currentScore === 10) { //om score når 10, prompt win och restart val
alert("You win!");
let restart = prompt("Do you want to restart the game? (yes/no)");
if (restart === "yes") { // om yes, gör function resetGame
resetGame();
}
} else {
nextEquation(); //om korrekt svar, kör next equation
}
} else {
currentLives--; // om svar är fel, ta bort 1 från livet
document.getElementById("lives").innerHTML = "Lives: " + currentLives;
document.getElementById("result").innerHTML = "Incorrect. The correct answer was " + currentAnswer;
if (currentLives === 0) { //om livet når 0, alert och prompt med val alternativ
alert("Game Over! You lost all your lives.");
let restart = prompt("Do you want to restart the game? (yes/no). If no, you can still play but reaching 10 points wont count as a real win");
if (restart === "yes") {
resetGame();
}
} else {
nextEquation(); //om fel svar och liv finns kvar, nextequation
}
}
}

//går nästa ekvation

function nextEquation() {
let game = mathGame(1,10, currentOperator);
currentEquation = game[0];
currentAnswer = game[1];
document.getElementById("equation").innerHTML = currentEquation;
document.getElementById("answer").value = "";
}

//tillåter dig skipa en ekvation, för varje skip förlora 1 från skips, max är 3. När 3 nåtts, alert
function skipFunction() {
if (currentSkip > 0) {
let game = mathGame(1,10, currentOperator);
currentEquation = game[0];
currentAnswer = game[1];
document.getElementById("equation").innerHTML = currentEquation;
document.getElementById("answer").value = "";
currentSkip--;
document.getElementById("skip").innerHTML = "Skips: " + currentSkip;
} else {
alert("You have run out of skips!");
}
}

//back funktion åt back knapp som gömmer coh displayar olika saker
function back() {
document.getElementById("operatorButtons").style.display = "flex";
document.getElementById("math_game").style.display = "none";
document.getElementById("math-restart-btn").style.display = "none";
document.getElementById("reseter").style.display = "block";

}

//reset game funktion som resetar liv, scores och skips
function resetGame() {
currentScore = 0;
document.getElementById("score").innerHTML = "Score: " + currentScore;
currentLives = 3;
document.getElementById("lives").innerHTML = "Lives: " + currentLives;
currentSkip = 3;
document.getElementById("skip").innerHTML = "Skips: " + currentSkip;
let game = mathGame(1,10, currentOperator);
currentEquation = game[0];
currentAnswer = game[1];
document.getElementById("equation").innerHTML = currentEquation;
document.getElementById("answer").value = "";
document.getElementById("result").innerHTML = "";
}


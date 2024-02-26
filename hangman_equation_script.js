        var fail = 0; // fail variabeln
        var currentEquation = 0;

        //förgjorda ekvationer samt svar

        var equations = [
            {question: "Int a = 100<br>Int b = 50<br><br><span style='color:yellow;'>Int x = a + b ?</span>", answer: "150"},
            {question: "Double a = 5.4<br>Double b = 3.2<br><br><span style='color:yellow;'>Double x = a + b ?</span>", answer: "8.6"},
            {question: "Int a = 10<br>Int b = 12<br><br><span style='color:yellow;'>Math.min(a,b) = ?</span>", answer: "10"},
            {question: "double z = 4.1<br>Double b = 3.2<br><br><span style='color:yellow;'>Math.floor(z,b) = ?</span>", answer: "7.0"},
            {question: "Int a = 4<br>Int b = 9<br><br><span style='color:yellow;'>Math.sqrt(a) + Math.sqrt(b) = ?</span>", answer: "5"},
            {question: "Int r = 39<br>Int t = 53<br><br><span style='color:yellow;'>Math.max(r,t) = ?</span>", answer: "53"}
        ];
        

	// rita hangman om svar i ekvation, detta görs genom switchstatements där man gör blocken visible

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


    //displayar ekvationen genom att hämta id av div i html koden, sen ersätta med ekvationen hämtad i scriptet

        function displayEquation() {
            document.getElementById("equation").innerHTML = equations[currentEquation].question;
            document.getElementById("answer").value = "";
            document.getElementById("result").innerHTML = "";
        }


        // checkar svaret ifall det stämmer
        function checkAnswer() {
            var userAnswer = document.getElementById("answer").value;
            if (userAnswer == equations[currentEquation].answer) {
              document.getElementById("result").innerHTML = "Correct!";
              currentEquation++;
              if (currentEquation == equations.length) {
                win();
                currentEquation = 0;
              }
              displayEquation();
            } else {
              fail++;
              drawHangman();
              if (fail == 6) {
                handleLoss();
              } else {
                if (fail < 6) {
                  document.getElementById("result").innerHTML = "Incorrect. Please try again.";
                }
              }
            }
          }
          
          
          //vid förlust

function handleLoss() {
    document.getElementById("result").innerHTML = "You lost... He died!";
  }
  

    function options()
    {
    document.getElementById("intro-box").style.display = "none";
    document.getElementById("option-box").style.display = "flex";

    }

    //köra igen

    function again()
    {
    document.getElementById("intro-box").style.display = "none";
    document.getElementById("option-box").style.display = "flex";
    document.getElementById("win-box").style.display = "none";

    }


    //vid game start

    function startGame1()
    {
        document.getElementById("equation-container").style.display ="flex";
        document.getElementById("option-box").style.display = "none";
		    document.getElementById("back-btn").style.display = "block";
		    document.getElementById("gameplan").style.display = "flex";
        displayEquation();
    }


    //resetar allt
    function resetGame() {
        fail = 0;
        currentEquation = 0;
        drawHangman();
        displayEquation();
      }

      function back() {
        document.getElementById("intro-box").style.display = "flex";
        document.getElementById("option-box").style.display = "none";
      }

      function game_back() {
        document.getElementById("option-box").style.display = "flex";
        document.getElementById("gameplan").style.display = "none";
        document.getElementById("back-btn").style.display = "none";
        document.getElementById("equation-container").style.display = "none";
        document.getElementById("word-options").style.display = "none";
      }


      //vid vinst
  function win()
  {
    document.getElementById("back-btn").style.display = "none";
    document.getElementById("gameplan").style.display = "none";
    document.getElementById("win-box").style.display = "flex";
  }


  //lämna spelet efter vinst
  function exit()
  {
    window.location.href = "index.html";
      return;
  }

  function word()
  {
    window.location.href = "wordhangman.html";
  }
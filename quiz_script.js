// Alexander Pavlovic alpa7946

/* Skapa array av frågor och svar samt options */

const quiz = {
    questions: [
      {
        question: "What is the top color on the neck of the guitar in the Guitar Hero game?",
        options: ["Green", "Red", "Blue", "Yellow"],
        answer: "Green"
      },
      {
        question: "What was the first commercially successful video game?",
        options: ["Shaq Fu", "Super Mario Bros", "Donkey Kong Country", "Pong"],
        answer: "Pong"
      },
      {
        question: "Which European city is the game Assassins Creed Unity set in?",
        options: ["London", "Florence", "Paris", "Jerusalem"],
        answer: "Paris"
      },
      {
        question: "What is Luigi's favourite food?",
        options: ["Pizza", "Roast beef", "Sausage and mash", "Cheese toastie"],
        answer: "Pizza"
      },
      {
        question: "What video game, that peaked in the late 2000's, got people to try stumping a cartoon genie?",
        options: ["Mario kart", "Skyrim", "Akinator", "Pac-man"],
        answer: "Akinator"
      }
    ],
    currentQuestion: 0,
    score: 0,
  
    /* Denna funktion används för att skapa de nödvändiga HTML-elementen för frågespelet, kallar på metoder som bygger quizet samt visar frågorna */

    init() {
      this.buildQuiz();
      this.showQuestion();
    },

    /* Denna funktion används för att bygga quizet genom att hämta element bt deras id i html sidan */
  
    buildQuiz() {
      const quizWrapper = document.getElementById("quizWrap");
      const questionEl = document.createElement("div");
      questionEl.id = "quizQn";
      quizWrapper.appendChild(questionEl);
  
      const optionsEl = document.createElement("div");
      optionsEl.id = "quizAns";
      quizWrapper.appendChild(optionsEl);
    },
  
    /* Denna funktion används för att visa frågorna, använder en for-in-loop för att iterera över den aktuella frågans options-egenskap, som är en rad svarsalternativ för den aktuella frågan.
 */
    showQuestion() {
      const currentQuestion = this.questions[this.currentQuestion];
      const questionEl = document.getElementById("quizQn");
      questionEl.innerHTML = currentQuestion.question;
  
      const optionsEl = document.getElementById("quizAns");
      optionsEl.innerHTML = "";

      /*/Varje nytt element tilldelas en eventlistener som kommer att utlösa "checkAnswer" funktionen. Slutligen läggs varje nytt element till som ett barn i elementet "quizAns"./*/
      for (let i in currentQuestion.options) {
        const optionEl = document.createElement("div");
        optionEl.innerHTML = currentQuestion.options[i];
        optionEl.dataset.idx = i;
        optionEl.addEventListener("click", e => this.checkAnswer(e));
        optionsEl.appendChild(optionEl);
      }
    },
  
    /* Denna funktion används för att kontrollera om det valda svaret är rätt eller fel och uppdatera poängen */

    checkAnswer(event) {
      const selectedOption = event.target;
      const currentQuestion = this.questions[this.currentQuestion];
  
      if (selectedOption.innerHTML === currentQuestion.answer) {
        this.score++; //add till score med 1 för varje rätt svar
        selectedOption.classList.add("correct");
      } else {
        selectedOption.classList.add("wrong");
      }
  
      this.currentQuestion++;
      setTimeout(() => {  //delayar nästa action med 1000 milisecconds så att användaren hinner se feedbacken på frågan
        if (this.currentQuestion < this.questions.length) {
          this.showQuestion();
        } else {
          this.showScore();
        }
      },
      1000);
    },
    

    /* Denna funktion används för att visa det totala poängresultatet när alla frågor har besvarats*/

    showScore() {
        const questionEl = document.getElementById("quizQn");
        questionEl.innerHTML = `You have answered ${this.score} of ${this.questions.length} correctly.`;
        const optionsEl = document.getElementById("quizAns");
        optionsEl.innerHTML = "";
      },

  /* Denna funktion används för att återställa frågespelet till början när användaren klickar på knappen "Try Again" */
  reset() {
    this.currentQuestion = 0;
    this.score = 0;
    this.showQuestion();
    }
    };

      /* Initierar frågespelet genom att skapa de nödvändiga HTML-elementen och visa den första frågan */
      quiz.init();
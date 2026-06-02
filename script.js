//DOM ELEMENTS

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");

const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");

const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");

const resultMessage = document.getElementById("result-message");

const progressBar = document.getElementById("progress");

// Questions
const quizQuestions = [
  {
    question: "What is the main feature of OOP?",
    answers: [
      { text: "Compilation", correct: false },
      { text: "Encapsulation", correct: true},
      { text: "Linking", correct: false},
      { text: "debugging", correct: false }
    ]
  },
  {
    question: "Which concept allows data hiding?",
    answers: [
      { text: "inheritance", correct: false },
      { text: "polymorphism", correct: false},
      { text: "encapsulation", correct: true},
      { text: "abstraction", correct: false }
    ]
  },
  {
    question: "A class is a:",
    answers: [
      { text: "variable", correct: false },
      { text: "blueprint for objects", correct: true },
      { text: "function", correct: false },
      { text: "loop", correct: false}
    ]
  },
  {
    question: "An object is :",
    answers: [
      { text: "Instance of a class", correct: true },
      { text: "Method", correct: false },
      { text: "Constructor", correct: false },
      { text: "Package", correct: false }
    ]
  },
  {
    question: "Which OOP concept allows one class to acquire properties of another?",
    answers: [
      { text: "Abstraction ", correct: false },
      { text: "Inheritance", correct: true },
      { text: "Encapsulation", correct: false },
      { text: "Overloading", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  scoreSpan.textContent = score;

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answerDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progress =
    ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  progressBar.style.width = progress + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");

    button.textContent = answer.text;
    button.classList.add("answer-btn");

    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(e) {
  if (answerDisabled) return;

  answerDisabled = true;

  const selectedButton = e.target;

  const isCorrect =
    selectedButton.dataset.correct === "true";

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  Array.from(answersContainer.children).forEach(button => {
    const correct =
      button.dataset.correct === "true";

    if (correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }

    button.disabled = true;
  });

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage =
    (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent =
      "Perfect Score! Excellent!";
  } else if (percentage >= 80) {
    resultMessage.textContent =
      "Great Job!";
  } else if (percentage >= 60) {
    resultMessage.textContent =
      "Good Work!";
  } else if (percentage >= 40) {
    resultMessage.textContent =
      "Keep Practicing!";
  } else {
    resultMessage.textContent =
      "Try Again!";
  }
}

function restartQuiz() {
  startQuiz();
}

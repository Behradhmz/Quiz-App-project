import formatData from "./helper.js";

const level = localStorage.getItem("level") || "medium";

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("score");
const Next = document.getElementById("next-button");
const questionNumberText = document.getElementById("Question-number");
const finishButton = document.getElementById("finish-button");
const error = document.getElementById("error");

const correct_bonus = 10;
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;
let questionIndex = 0;
let formattedData = null;
let correctAnswer = null;
let score = 0;
let isAccepted = true;

const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    formattedData = formatData(json.results);
    console.log(formattedData);
    Start();
  } catch (err) {
    loader.style.display = "none";
    error.style.display = "block";
  }
};

const Start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
  questionNumberText.innerText = questionIndex + 1;
  const { question, answers, correctAnswerIndex } =
    formattedData[questionIndex];
  correctAnswer = correctAnswerIndex;
  console.log(correctAnswer);
  questionText.innerText = question;
  answerList.forEach((button, index) => {
    button.innerText = answers[index];
  });
};

const chekAnswer = (event, index) => {
  if (!isAccepted) return;
  isAccepted = false;
  
  const isCorrect = index === correctAnswer ? true : false;
  if (isCorrect) {
    event.target.classList.add("correct");
    score += correct_bonus;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
  }
};

const nextHandler = () => {
  questionIndex++;
  if (questionIndex < formattedData.length) {
    isAccepted = true;
    removeClasses();
    showQuestion();
  } else {
    localStorage.setItem("score", JSON.stringify(score));
    window.location.assign("/end.html");
  }
};

const removeClasses = () => {
  answerList.forEach((button) => {
    button.className = "answer-text";
  });
};

const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("/end.html");
};

window.addEventListener("load", fetchData);
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => chekAnswer(event, index));
});
Next.addEventListener("click", nextHandler);
finishButton.addEventListener("click", finishHandler);

"use strict";

const modeToggle = document.getElementById("mode-thumb");
const main = document.querySelector("main");
const questionsContainer = document.querySelector(".questions-container");
const answerContainer = document.querySelector(".answer-container");
const submitBtn = document.querySelector(".submit");
const questionsEl = document.querySelector(".questions");

let selectedIndex = null;
let questionNumber = 1;

// Toggle Dark-Light Mode

let enable = false;
// Sayfaya her geri dönüldügünde bu kod calissin!Su anda calsimiyor.
// modeToggle.checked = false;
const enableDarkMode = () => {
  main.classList.add("darkmode");
};

const disableDarkMode = () => {
  main.classList.remove("darkmode");
};

modeToggle.addEventListener("click", () => {
  enable = !enable;
  if (enable) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

// Get index of clicked Question element

questionsEl.addEventListener("click", (e) => {
  const questionsArray = Array.from(questionsEl.children);
  const index = questionsArray.indexOf(e.target);

  if (index !== -1) {
    selectedIndex = index;
    fetchData();
  }
  console.log(index);
});

// const countQuestions = () => {
//   questionNumber++;
//   if (questionNumber > 10) return;
//   console.log(questionNumber);
// };

// API

const apiUrl = "../data.json";

const fetchData = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    if (selectedIndex === null || selectedIndex === undefined) return;

    const { title, icon, questions } = data.quizzes[selectedIndex];
    const { answer, question, options } = questions[0];
  } catch (error) {
    console.error("Error:", error);
  }
};

fetchData();

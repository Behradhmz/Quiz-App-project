const highScores = JSON.parse(localStorage.getItem("highscores")) || [];

const list = document.querySelector("ol");
const deleteButton = document.getElementById("delete");

const content = highScores.map((score, index) => {
  return `
    <li>
    <span>${index + 1}</span>
    <p>${score.name}</p>
    <span>${score.score}</span>
    </li>`;
});

list.innerHTML = content.join("");


const deleteHandler = () => {
    localStorage.removeItem("highscores");
}

deleteButton.addEventListener("click",deleteHandler)

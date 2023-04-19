import { getFirebase } from "./js/database";
import { putToFirebase } from "./js/database";

const playerText = document.querySelector("#playerText");
const computerText = document.querySelector("#computerText");
const resultText = document.querySelector("#resultText");
const choiceBtns = document.querySelectorAll(".choiceBtn");
let playerNameBtn = document.querySelector('#playerNameBtn');
let playerName = document.querySelector('#playerName');
let rematch = document.querySelector('#rematch');
let player;
let computer;
let playerWins = 0;

choiceBtns[0].style.display = 'none';
choiceBtns[1].style.display = 'none';
choiceBtns[2].style.display = 'none';

getFirebase();
playerNameBtn.addEventListener('click', function (event) {
    event.preventDefault();

    choiceBtns[0].style.display = null;
    choiceBtns[1].style.display = null;
    choiceBtns[2].style.display = null;

    playerText.innerHTML = playerName.value + ': ';
});

rematch.addEventListener('click', function () {
    location.reload();
}, false);


choiceBtns.forEach(button => button.addEventListener("click", () => {
    player = button.textContent;
    computerTurn();
    playerText.textContent = `${playerName.value}: ${player}`;
    computerText.textContent = `Computer: ${computer}`;
    let checkWins = checkWinner();
    resultText.textContent = checkWins;
    if (checkWins == 'You Lose!') {
        putToFirebase();
        rematchCheck();
        choiceBtns[0].style.display = 'none';
        choiceBtns[1].style.display = 'none';
        choiceBtns[2].style.display = 'none';
    }
    else if (checkWins == 'You Win!') {
        playerWins++;
    }


    let playerWinsLabel = document.querySelector('#playerWinsLabel');
    playerWinsLabel.innerHTML = 'Player Wins: ' + playerWins;
}));

function computerTurn() {
    const randNum = Math.floor(Math.random() * 3) + 1;

    switch (randNum) {
        case 1:
            computer = '✊';
            break;
        case 2:
            computer = '✋';
            break;
        case 3:
            computer = '✌️';
            break;
    }
}
function checkWinner() {


    if (player == computer) {
        return 'Draw!';
    }
    else if (computer == '✊') {
        return (player == '✋') ? 'You Win!' : 'You Lose!'
    }
    else if (computer == '✋') {
        return (player == '✌️') ? 'You Win!' : 'You Lose!'
    }
    else if (computer == '✌️') {
        return (player == '✊') ? 'You Win!' : 'You Lose!'
    }
}

function rematchCheck() {
    //turns = 0;
    const rematchBtn = document.querySelector('#rematch');
    rematchBtn.style.display = 'inherit';

}

export { playerWins }
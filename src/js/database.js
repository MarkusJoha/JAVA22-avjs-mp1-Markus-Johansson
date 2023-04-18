import _ from "underscore";
import { playerWins } from "../main";

let sort;

async function getFirebase() {
    const url = 'https://rps-highscore-default-rtdb.europe-west1.firebasedatabase.app/highscore/highscore.json';

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    sort = _.sortBy(data, 'score');

    displayHighscore(sort);
}

async function putToFirebase() {
    let newPlayer = true;

    for (const key in sort) {
        let name = sort[key].name;
        let score = sort[key].score;
        if (name == playerName.value && score < playerWins) {
            sort[key].score = playerWins;
            sort[key].name = playerName.value;
            newPlayer = false;
            put();
        }
        else if (name == playerName.value && score >= playerWins) newPlayer = false;
    }

    if (newPlayer && playerWins > sort[0].score) {
        sort[0].score = playerWins;
        sort[0].name = playerName.value;
        put();
    }
}

async function put() {
    const url = 'https://rps-highscore-default-rtdb.europe-west1.firebasedatabase.app/highscore/highscore.json';

    const options = {
        method: 'PUT',
        body: JSON.stringify(sort),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    displayHighscore(sort);
}

async function displayHighscore(data) {
    const ol = document.querySelector('ol');
    ol.innerHTML = '';
    for (const key in data) {
        const li = document.createElement('li');
        ol.prepend(li);
        li.innerText = data[key].name + ': ' + data[key].score;
    }
}

export { getFirebase, putToFirebase }
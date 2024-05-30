const statusdisplay = document.querySelector('.game-status');
const winSound = document.getElementById('winSound'); // Access the audio element for win sound
const clickSound = document.getElementById('clickSound'); // Access the audio element for click sound

let gameactive = true;
let currentplayer = "X";
let gamestate = ["", "", "", "", "", "", "", "", ""];

const winningmessage = () => `Player ${currentplayer} has won!`;
const drawmessage = () => `Game ended in a draw`;
const currentplayerturn = () => `It's ${currentplayer}'s turn`;

statusdisplay.innerHTML = currentplayerturn();

const winningconditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handlecellplayed(clickedcell, clickedcellindex) {
    gamestate[clickedcellindex] = currentplayer;
    clickedcell.innerHTML = currentplayer;
    console.log(`Cell ${clickedcellindex} played by ${currentplayer}`);
}

function handleplayerchange() {
    currentplayer = currentplayer === "X" ? "O" : "X";
    statusdisplay.innerHTML = currentplayerturn();
}

function handleresultvalidation() {
    let roundwon = false;

    for (let i = 0; i < winningconditions.length; i++) {
        const wincondition = winningconditions[i];
        let a = gamestate[wincondition[0]];
        let b = gamestate[wincondition[1]];
        let c = gamestate[wincondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundwon = true;
            break;
        }
    }

    if (roundwon) {
        statusdisplay.innerHTML = winningmessage();
        winSound.play(); // Play the win sound
        gameactive = false;
        return;
    }

    let rounddraw = !gamestate.includes("");
    if (rounddraw) {
        statusdisplay.innerHTML = drawmessage();
        gameactive = false;
        return;
    }

    handleplayerchange();
}

function handlecellclick(event) {
    const clickedcell = event.target;
    const clickedcellindex = parseInt(clickedcell.getAttribute('data-cell-index'));

    if (gamestate[clickedcellindex] !== "" || !gameactive) {
        return;
    }

    clickSound.play(); // Play the click sound
    handlecellplayed(clickedcell, clickedcellindex);
    handleresultvalidation();
}

function handlerestartgame() {
    gameactive = true;
    currentplayer = "X";
    gamestate = ["", "", "", "", "", "", "", "", ""];
    statusdisplay.innerHTML = currentplayerturn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handlecellclick));
document.querySelector('.restart').addEventListener('click', handlerestartgame);

const Gameboard = (() => {
    const gameboard = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];

    for (let i = 0; i < gameboard.length; i++) {
        const board = document.getElementById("gameboard");
        let div = document.createElement("div");
        div.setAttribute("class", "square");
        div.setAttribute("id", gameboard[i]);
        board.appendChild(div);
    }

    return {
        gameboard
    }
})();

const player = (name, marker) => {
    const plays = [];
    let wins = 0;
    return {
        name,
        marker,
        plays,
        wins
    };
};

const Game = (() => {
    const player1 = player("Player 1", "x");
    const player2 = player("Player 2", "o");

    let currentPlayer = player1;
    let active = document.getElementById("player1")
    active.setAttribute("class", "active");

    function switchPlayer() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
            let inactive = document.getElementById("player1")
            inactive.setAttribute("class", "inactive");
            let active = document.getElementById("player2")
            active.setAttribute("class", "active");
        }
        else {
            currentPlayer = player1;
            let inactive = document.getElementById("player2")
            inactive.setAttribute("class", "inactive");
            let active = document.getElementById("player1")
            active.setAttribute("class", "active");
        }
    }

    function checkWinner() {
        const winningCombinations = [
            ["a1", "a2", "a3"],
            ["a1", "b1", "c1"],
            ["a1", "b2", "c3"],
            ["b1", "b2", "b3"],
            ["c1", "c2", "c3"],
            ["a2", "b2", "c2"],
            ["a3", "b3", "c3"],
            ["a3", "b2", "c1"]];

        for (let i = 0; i < winningCombinations.length; i++) {
            let winner = winningCombinations[i].every(i => currentPlayer.plays.includes(i));
            if (winner) {
                currentPlayer.wins += 1;
                let modal = document.getElementById("modal");
                modal.style.display = "block";
                let result = document.getElementById("result")
                result.innerText = "Congratulations " + currentPlayer.name + "! You're the winner!";
                const round = document.getElementById("new-round");
                round.addEventListener("click", () => {
                    displayWins();
                    newRound();
                    modal.style.display = "none";
                })
            }
            if (!winner && currentPlayer.plays.length > 4) {
                let modal = document.getElementById("modal");
                modal.style.display = "block";
                let result = document.getElementById("result")
                result.innerText = "It's a draw!";
                const round = document.getElementById("new-round");
                round.addEventListener("click", () => {
                    displayWins();
                    newRound();
                    modal.style.display = "none";
                })
                break;
            };
        }
    }

    function newRound() {
        Gameboard.gameboard = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];
        player1.plays = [];
        player2.plays = [];
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.classList.remove(player1.marker, player2.marker);
        })
    }

    function displayWins() {
        const first = document.getElementById("score1");
        const second = document.getElementById("score2");
        first.innerText = player1.wins;
        second.innerText = player2.wins;
    }

    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
        square.addEventListener("click", () => {
            let move = square.id;
            if (Gameboard.gameboard.includes(move)) {
                square.classList.add(currentPlayer.marker);
                let plays = currentPlayer.plays;
                let cut = Gameboard.gameboard.indexOf(move);
                plays.push(move)
                Gameboard.gameboard.splice(cut, 1);
                checkWinner();
                switchPlayer();
            }
            else {
                alert("Oops! That's not a legal play. Please choose an empty square.")
            }
        })
    })

})();

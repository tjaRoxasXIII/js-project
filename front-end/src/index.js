const SCORE_URL = "http://localhost:3000/scoreboards/1"
const PLAYERS_URL = "http://localhost:3000/users"
const ENEMY_URL = "http://localhost:3000/enemies"
const HERO_URL = "http://localhost:3000/heros"

let currentPlayer
let gameArea = document.getElementById("game_area")
const gameID = 1 //can be adjusted if you have games with different IDs
let startButton = document.getElementById("start")
startButton.style.display = "none"

//Used to DRY up fetch requests from API.  Passes in the URL to fetch from and the function to call on the return data
function fetcher(URL, fnctn) {
    fetch(URL)
    .then(response => response.json())
    .then(json => fnctn(json))
}

window.addEventListener(`DOMContentLoaded`, (e) => {
    fetcher(ENEMY_URL, buildCards)
    fetcher(HERO_URL, buildCards)
    buildScoreboard()
    fetcher(SCORE_URL, updateScore)
    const myForm = document.getElementById("player")
    myForm.addEventListener("submit", function(e) {
        e.preventDefault()
        const name = this.username.value
        createOrSignInPlayer(name, gameID)
        e.reset
        startButton.style.display = "block"
        myForm.style.display = "none"
        buildYourScore()
    })
    document.getElementById("start").addEventListener("click", startGame)

})

//Used to grab our scoreboard element from the DOM
function buildScoreboard() {
    let board = document.getElementById("scoreboard")
    
    let title = document.createElement('h3')
    title.innerText = `Top Scores`
    board.appendChild(title)
    
    for(let i = 0; i < 10; i++) {
        let user_score = document.createElement("li")
            user_score.innerText = "-"
        
        board.appendChild(user_score)
    }
}
//Adds scores from the DB of the top 10 scores
function updateScore(scorelist) {
    let board = document.getElementById("scoreboard")
    let top_scores = []

    for(const user of scorelist.users) {
        if (user.top_score){
            top_scores.push([user.username, user.top_score])
        }
    }
    //Sorts the 
    top_scores.sort(function(a, b){return b[1]-a[1]})

    for(let i = 1; i < 11; i++) {
        let user_score = board.childNodes
        if (top_scores[i - 1]){
            debugger
            user_score[i].innerText = `${top_scores[i - 1][0]}: ${top_scores[i -1][1]}`
        }
    }
}

function buildYourScore() {
    let board = document.getElementById("your_score")
    
    let title = document.createElement('h3')
    title.innerText = `Current Score`
    board.appendChild(title)

    let score = document.createElement('h4')
    score.id = "current_score"
    score.innerText = "0"
    board.appendChild(score)
    
}


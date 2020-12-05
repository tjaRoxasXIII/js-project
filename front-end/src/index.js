const SCORE_URL = "http://localhost:3000/scoreboards/1"
const PLAYERS_URL = "http://localhost:3000/users"
const ENEMY_URL = "http://localhost:3000/enemies"
const HERO_URL = "http://localhost:3000/heros"

let currentPlayer
let gameArea = document.getElementById("game_area")
const gameID = 1 //can be adjusted if you have games with different IDs
let startButton = document.getElementById("start")
startButton.style.display = "none"


window.addEventListener(`DOMContentLoaded`, (e) => {
    fetcher(ENEMY_URL, buildCards)
    fetcher(HERO_URL, buildCards)
    fetcher(SCORE_URL, displayScores)
    const myForm = document.getElementById("player")
    myForm.addEventListener("submit", function(e) {
        e.preventDefault()
        const name = this.username.value
        createOrSignInPlayer(name, gameID)
        e.reset
        startButton.style.display = "block"
        myForm.style.display = "none"
    })
    document.getElementById("start").addEventListener("click", startGame)

})

function displayScores(scorelist) {

    let board = document.getElementById("scoreboard")
    
    let title = document.createElement('h3')
    title.innerText = `Top Scores for ${scorelist.game_name}`
    board.appendChild(title)

    const top_scores = []

    for(const user of scorelist.users) {
        if (user.top_score){
            top_scores.push(`${user.username}: ${user.top_score}`)
        }

    }

    top_scores.sort(function(a, b){return b-a})
    
    for(let i = 0; i < 10; i++) {
        let user_score = document.createElement("li")
        if (top_scores[i]){
            user_score.innerText = top_scores[i]
        }
        else {
            user_score.innerText = "-"
        }
        board.appendChild(user_score)
    }
}



//Used to DRY up fetch requests from API
function fetcher(URL, fnctn) {
    fetch(URL)
        .then(function(response) {
        return response.json()
    })
    .then(function(json) {
        fnctn(json)
    })
}
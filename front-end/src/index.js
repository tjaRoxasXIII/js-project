const SCORE_URL = "http://localhost:3000/scoreboards/1"
const PLAYERS_URL = "http://localhost:3000/users"
const ENEMY_URL = "http://localhost:3000/enemies"
let gameArea = document.getElementById("game_area")
let startButton = document.getElementById("start")
const enemyCards = []
startButton.style.display = "none"

debugger

window.addEventListener(`DOMContentLoaded`, (e) => {
    fetch(ENEMY_URL)
    .then(function(response) {
        return response.json()
    })
    .then(function(json) {
        buildEnemyCards(json)
    })

    startButton.style.display = "block"
})

document.getElementById("start").addEventListener("click", startGame)

fetch(SCORE_URL)
.then(function(response) {
    return response.json()
})
.then(function(json) {
    displayScores(json)
})

function displayScores(scorelist) {

    let board = document.getElementById("scoreboard")
    
    let title = document.createElement('h3')
    title.innerText = `Top Scores for ${scorelist.game_name}`
    board.appendChild(title)

    const top_scores = []

    for(const user of scorelist.users) {
        debugger
        top_scores.push(`${user.username}: ${user.top_score}`)
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

function startGame() {
    startButton.style.display = "none"

    drawEnemy(enemyCards)
}


function buildEnemyCards(list) {

    for(const enemy of list) {
        let enemyDiv = document.createElement("div")
        enemyDiv.className = "card"

        let enemyChar = document.createElement("ul")
        enemyChar.innerText = enemy.name
        enemyDiv.appendChild(enemyChar)

        let enemyHp = document.createElement("li")
        enemyHp.innerText = `HP: ${enemy.hp}`
        enemyChar.appendChild(enemyHp)

        enemyCards.push(enemyDiv)
        
    }
}

function drawEnemy(enemies) {
    let totalCards = enemyCards.length
    let i = Math.floor(Math.random() * totalCards)
    debugger
    gameArea.appendChild(enemyCards[i])
}

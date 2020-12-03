const SCORE_URL = "http://localhost:3000/scoreboards/1"
const PLAYERS_URL = "http://localhost:3000/users"
const ENEMY_URL = "http://localhost:3000/enemies"
let gameArea = document.getElementById("game_area")
let startButton = document.getElementById("start")

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
    title.innerText = `Score for ${scorelist.game_name}`
    board.appendChild(title) 
    for(const user of scorelist.users) {
        debugger
    }

}

function startGame() {
    startButton.style.display = "none"

    fetch(ENEMY_URL)
    .then(function(response) {
        return response.json()
    })
    .then(function(json) {
        buildEnemyCards(json)
    })
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

        gameArea.appendChild(enemyDiv)

    }
}

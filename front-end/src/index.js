const SCORE_URL = "http://localhost:3000/scoreboards/1"
const PLAYERS_URL = "http://localhost:3000/users"

fetch(SCORE_URL)
.then(function(response) {
    return response.json()
})
.then(function(json) {
    displayScores(json)
})

fetch(PLAYERS_URL)
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
    // for(const playScore of scorelist) {
    // }

}
    

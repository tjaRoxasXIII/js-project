const SCORE_URL = "http://localhost:3000/scoreboards/1"
const PLAYERS_URL = "http://localhost:3000/users"
let myBg = document.getElementById("bg")
let ctx = myBg.getContext("2d")
ctx.fillStyle = "#000000"
ctx.fillRect(0, 0, 600, 600)
displayPlayer()

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

function displayPlayer() {
    let ship = new Image()
    ship.src = "./sprites/Rocket_template.png"
    document.addEventListener('keydown', function(e) {
        const key = e.key
        switch (e.key) {
            case "ArrowLeft":
                movePlayerLeft()
                // console.log(`moving left!`)
                break;
            case "ArrowRight":
                movePlayerRight()
                // console.log(`moving right!`)
                break;
        }
    })

    document.addEventListener('keyup', function(e) {
        const key = e.key
        switch (e.key) {
            case "ArrowLeft":
                
                // console.log(`moving left!`)
                break;
            case "ArrowRight":
                
                // console.log(`moving right!`)
                break;
        }
    })
    

    debugger
    // myBg.appendChild(ship)

    let x = 300
    let y = 500

    let speedX = 0
    let speedY = 0
    
    let srcX
    let srcY
    let sheetWidth = 256
    let sheetHeight = 64

    let cols = 4

    let width = sheetWidth / cols
    let height = sheetHeight

    let currentFrame = 0

    function updateFrame() {
        currentFrame = ++currentFrame % cols

        srcX = currentFrame * width
        srcY = 0

        ctx.fillRect(0, 0, 600, 600)
    }

    function renderAnimation() {
        updateFrame()
        ctx.drawImage(ship,srcX, srcY, width, height, x, y, width, height)
    }

    setInterval(function(){
        renderAnimation()   
    }, 100)

    function movePlayerLeft() {
        x -= 15
    }

    function movePlayerRight() {
        x += 15
    }
}
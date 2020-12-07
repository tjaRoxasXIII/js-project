function startGame() {
    startButton.style.display = "none"
    drawCard(enemyCards)
    drawCard(heroCards)
    displayActions()
    fetcher(SCORE_URL, updateScore)
    
}
// Assigns player actions to the buttons 
function displayActions() {
    let attackAction = document.createElement("button")
    attackAction.innerText = "Attack"
    gameArea.appendChild(attackAction)
    attackAction.addEventListener("click", function(e) {
        setTimeout(function() {
            playerTurn("attack")
            e.preventDefault()
        }, 1000)
    })

    let defendAction = document.createElement("button")
    defendAction.innerText = "Defend"
    gameArea.appendChild(defendAction)
    defendAction.addEventListener("click", function() {
        playerTurn("defend")
    })

    let healAction = document.createElement("button")
    healAction.innerText = "Heal"
    gameArea.appendChild(healAction)
    healAction.addEventListener("click", function() {
        playerTurn("heal")
    })
}

//Based upon the button clicked, performs the corresponding action
function playerTurn(action) {
    if (action == "heal") {
        myHero.hp += 10
        console.log(myHero.hp)
    }
    if (action == "attack") {
        myEnemy.hp = myEnemy.hp - myHero.attack
        console.log(myEnemy.hp)
    }
    if (action == "defend") {
        console.log(`You took no damage`)
    }

    refreshCard("enemy")
    checkIfDead(myEnemy)
}
//Generates a random move for the enemy
function enemyTurn() {
    let enemyActions = ["attack", "defend", "miss", "heal"]
    let actions = enemyActions.length
    let i = Math.floor(Math.random() * actions)

    let action = enemyActions[i]

    if (action == "heal") {
        myEnemy.hp += 10
        // alert("Enemy has healed")
    }
    if (action == "attack") {
        myHero.hp = myHero.hp - myEnemy.attack
        console.log("Enemy has attacked")
    }
    if (action == "defend") {
        console.log(`Enemy has defended`)
    }
    if (action == "miss") {
        console.log(`Enemy has missed`)
    }

    refreshCard("player")
    checkIfDead(myHero)
}

//Checks hero and enemy health to determine next move
function checkIfDead(character) {
    if (myEnemy.hp < 1) {
        currentPlayer.score += myEnemy.points
        console.log(`You defeated ${myEnemy.name} and earned ${myEnemy.points} points!`)
        console.log(`Your current score is ${currentPlayer.score}`)
        fetcher(ENEMY_URL, buildCards)
        drawNewEnemy(enemyCards)
    }
    else if (character === myEnemy){
        enemyTurn()
    }

    if (myHero.hp < 1) {
        console.log(`You have died.  Game Over.`)
        endgame()
    }
    
    
    
}
//When game ends, remove the character cards, disply score, and ask to restart game
function endgame() {
    while (gameArea.hasChildNodes()) {
        gameArea.removeChild(gameArea.firstChild)
    }
    let gameOver = document.createElement("h2")
    gameOver.innerText = "Game Over!"

    let yourScore = document.createElement("h3")
    yourScore.innerText = `Your Score: ${currentPlayer.score}`
    gameOver.appendChild(yourScore)

    if (currentPlayer.score > currentPlayer.top_score) {
        currentPlayer.top_score = currentPlayer.score
        savePlayer(currentPlayer)
    }

    let restart = document.createElement("button")
    restart.innerText = "Play again?"
    restart.addEventListener('click', function() {
        restartGame()
    })
    gameOver.appendChild(restart)


    gameArea.appendChild(gameOver)
}

//Clears game area and starts game again
function restartGame() {
    while (gameArea.hasChildNodes()) {
        gameArea.removeChild(gameArea.firstChild)
    }
    fetcher(ENEMY_URL, buildCards)
    fetcher(HERO_URL, buildCards)
    currentPlayer.score = 0
    startGame()
}
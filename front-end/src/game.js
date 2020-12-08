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
        attackAction.id = "Attack_button"
        attackAction.innerText = "Attack"
        gameArea.appendChild(attackAction)
        attackAction.addEventListener("click", function() {
            playerTurn("attack")
        })

    // let defendAction = document.createElement("button")
    // defendAction.innerText = "Defend"
    // gameArea.appendChild(defendAction)
    // defendAction.addEventListener("click", function() {
    //     playerTurn("defend")
    // })

    let healAction = document.createElement("button")
        healAction.id = "Heal_button"
        healAction.innerText = "Heal"
        gameArea.appendChild(healAction)
        healAction.addEventListener("click", function() {
            playerTurn("heal")
        })

    let dialogueBox = document.createElement("div")
        dialogueBox.id = "Log_box"
        dialogueBox.innerText = "Choose your action"
        gameArea.appendChild(dialogueBox)

}

//Updates dialogue based on actions performed
function updateText(text) {
    document.getElementById("Log_box").innerText = text
}

//Based upon the button clicked, performs the corresponding action
function playerTurn(action) {
    switch (action) {
        case "heal":
            if (myHero.hp > myHero.maxHP - Math.floor(myHero.maxHP * .3)) {
                myHero.hp = myHero.maxHP
            }
            else {
                myHero.hp += Math.ceil(myHero.maxHP * .3)
            }
            refreshCard("player")
            updateText("You have healed")
            break;
        case "attack":
            myEnemy.hp = myEnemy.hp - myHero.attack
            refreshCard("enemy")
            updateText(`You attack the ${myEnemy.name}!`)
            // break;
        // case "defend":
        //     console.log(`Enemy has defended`)
    }

    document.querySelector("#Attack_button").style.display = "none"
    document.querySelector("#Heal_button").style.display = "none"
    checkIfDead(myEnemy)//Passing the enemy to this function calls the enemies turn if the enemy is still alive
}
//Generates a random move for the enemy
function enemyTurn() {
    let enemyActions = ["attack", "miss", "heal"]
    let actions = enemyActions.length
    let i = Math.floor(Math.random() * actions)

    let action = enemyActions[i]

    switch (action) {
        case "heal":
            if (myEnemy.hp > myEnemy.maxHP - Math.floor(myEnemy.maxHP * .4)) {
                myEnemy.hp = myEnemy.maxHP
            }
            else {
                myEnemy.hp += Math.ceil(myEnemy.maxHP * .4)
            }
            refreshCard("enemy")
            updateText(`${myEnemy.name} has healed.`)
            break;
        case "attack":
            myHero.hp = myHero.hp - myEnemy.attack
            refreshCard("player")
            updateText(`${myEnemy.name} attacks you!`)
            break;
        case "miss":
            updateText(`${myEnemy.name} has missed...`)
    }

    checkIfDead(myHero)
    setTimeout( function() {
        document.querySelector("#Attack_button").style.display = ""
        document.querySelector("#Heal_button").style.display = ""
    }, 500)
    
}

//Checks hero and enemy health to determine next move
function checkIfDead(character) {
    if (myHero.hp < 1) {
        setTimeout( function() {
            alert(`You have died.  Game Over.`)
        }, 500)
        endgame()
    }
    if (myEnemy.hp < 1) {
        currentPlayer.score += myEnemy.points
        alert(`You defeated ${myEnemy.name} and earned ${myEnemy.points} points!`)
        document.getElementById("your_score").children.current_score.innerText = currentPlayer.score
        document.querySelector("#Attack_button").style.display = ""
        document.querySelector("#Heal_button").style.display = ""
        fetcher(ENEMY_URL, buildCards)
        drawNewEnemy(enemyCards)
    }
    else if (character === myEnemy){
        refreshCard("player")
        setTimeout( function() {
            enemyTurn()
        }, 1000)
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
        currentPlayer.savePlayer()
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
    document.getElementById("your_score").children.current_score.innerText = currentPlayer.score
    startGame()
}
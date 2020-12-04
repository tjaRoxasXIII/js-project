function startGame() {
    startButton.style.display = "none"
    drawCard(enemyCards)
    drawCard(heroCards)
    displayActions()
}

function displayActions() {
    let attackAction = document.createElement("button")
    attackAction.innerText = "Attack"
    gameArea.appendChild(attackAction)
    attackAction.addEventListener("click", function() {
        turn("attack")
    })

    let defendAction = document.createElement("button")
    defendAction.innerText = "Defend"
    gameArea.appendChild(defendAction)
    defendAction.addEventListener("click", function() {
        turn("defend")
    })

    let healAction = document.createElement("button")
    healAction.innerText = "Heal"
    gameArea.appendChild(healAction)
    healAction.addEventListener("click", function() {
        turn("heal")
    })
}

function turn(action) {
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

    refreshCards()
    checkIfDead()
}

function checkIfDead() {
    if (myEnemy.hp < 1) {
        currentPlayer.score += myEnemy.points
        console.log(`You defeated ${myEnemy.name} and earned ${myEnemy.points} points!`)
        console.log(`Your current score is ${currentPlayer.score}`)
        drawCard(enemyCards)
    }
    if (myHero.hp < 1) {
        console.log(`You have died.  Game Over.`)
    }
}
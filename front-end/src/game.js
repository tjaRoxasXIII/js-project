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

    refreshCards()
    checkIfDead(myEnemy)
}

function enemyTurn() {
    let enemyActions = ["attack", "defend", "miss", "heal"]
    let actions = enemyActions.length
    let i = Math.floor(Math.random() * actions)

    let action = enemyActions[i]

    if (action == "heal") {
        myEnemy.hp += 10
        console.log("Enemy has healed")
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

    refreshCards()
    checkIfDead(myHero)
}

function checkIfDead(character) {
    if (myEnemy.hp < 1) {
        currentPlayer.score += myEnemy.points
        console.log(`You defeated ${myEnemy.name} and earned ${myEnemy.points} points!`)
        console.log(`Your current score is ${currentPlayer.score}`)
        fetcher(ENEMY_URL, buildCards)
        drawCard(enemyCards)
    }
    if (myHero.hp < 1) {
        console.log(`You have died.  Game Over.`)
    }
    
    if (character === myEnemy){
        enemyTurn()
    }
    
}
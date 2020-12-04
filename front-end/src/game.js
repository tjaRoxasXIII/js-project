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
    attackAction.addEventListener("click", turn("attack"))

    let defendAction = document.createElement("button")
    defendAction.innerText = "Defend"
    gameArea.appendChild(defendAction)
    attackAction.addEventListener("click", turn("defend"))

    let healAction = document.createElement("button")
    healAction.innerText = "Heal"
    gameArea.appendChild(healAction)
    attackAction.addEventListener("click", turn("heal"))
}

function turn(action) {
    debugger
    if (action == "heal") {
        myHero.hp += 10
        console.log(myHero.hp)
    }
    if (action == "attack") {
        myEnemy.hp -= myHero.attack
        console.log(myEnemy.hp)
    }
}
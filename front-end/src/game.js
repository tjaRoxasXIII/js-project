function startGame() {
    startButton.style.display = "none"
    let enemy = drawCard(enemyCards)
    let hero = drawCard(heroCards)
}

function turn() {
    hero(chooseAction)
    enemy(selectAction)
}

function chooseAction(input) {
    action = input
}
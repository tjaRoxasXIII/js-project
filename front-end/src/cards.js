// Parses all enemies from the API into a list that can be randomly drawn from for the next fight
function buildCards(list) {

    for(const character of list) {
        

        if(character.points){
            // characterDiv.id = "enemy-card"
            let enemy = new Enemy(character.id, character.name, character.hp, character.attack, character.points)
            enemyCards.push(enemy)  
        } 
        else {
            // characterDiv.id = "hero-card"
            let hero = new Hero(character.id, character.name, character.hp, character.attack)
            heroCards.push(hero)
        }
    }
}

// Randomly draws a character from the specified character list
function drawCard(characterList) {
    let totalCards = characterList.length
    let i = Math.floor(Math.random() * totalCards)
    let card = characterList[i]
    debugger
    let characterDiv = document.createElement("div")
    if (card instanceof Enemy) {
        myEnemy = card
        characterDiv.id = "enemy-card"
    }
    else {
        myHero = card
        characterDiv.id = "hero-card"
    }

        

    let char = document.createElement("ul")
        char.id = "name"
        char.innerText = card.name
        characterDiv.appendChild(char)

    let charHP = document.createElement("li")
        charHP.id = "hp"
        charHP.innerText = `HP: ${card.hp}`
        characterDiv.appendChild(charHP)

    let charAtt = document.createElement("li")
        charAtt.id = "attack"
        charAtt.innerText = `Attack: ${card.attack}`
        characterDiv.appendChild(charAtt)

    gameArea.appendChild(characterDiv)
}

function refreshCards() {
    let enemyCard = document.getElementById("enemy-card")
    enemyCard.children.hp.innerText = `HP: ${myEnemy.hp}`

    let heroCard = document.getElementById("hero-card")
    heroCard.children.hp.innerText = `HP: ${myHero.hp}`
}

function drawNewEnemy(characterList) {
    let totalCards = characterList.length
    let i = Math.floor(Math.random() * totalCards)
    let card = characterList[i]
    myEnemy = card

    let newEnemy = document.getElementById("enemy-card").children
    newEnemy[0].innerText = card.name
    newEnemy[1].innerText = `HP: ${card.hp}`
    newEnemy[2].innerText = `Attack: ${card.attack}`
}
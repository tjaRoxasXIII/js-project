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

// Randomly draws an character from the specified character list
function drawCard(characterList) {
    let totalCards = characterList.length
    let i = Math.floor(Math.random() * totalCards)
    let card = characterList[i]
    if (card instanceof Enemy) {
        myEnemy = card
    }
    else {
        myHero = card
    }

    let characterDiv = document.createElement("div")
        

    let char = document.createElement("ul")
        // char.id = "name"
        char.innerText = card.name
        characterDiv.appendChild(char)

    let charHP = document.createElement("li")
        // charHP.id = "hp"
        charHP.innerText = `HP: ${card.hp}`
        characterDiv.appendChild(charHP)

    let charAtt = document.createElement("li")
        // charAtt.id = "attack"
        charAtt.innerText = `Attack: ${card.attack}`
        characterDiv.appendChild(charAtt)

    gameArea.appendChild(characterDiv)
}
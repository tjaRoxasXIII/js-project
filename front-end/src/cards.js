//Sets variables to be used when calling drawCard() for either the hero or enemy for global updating
let myHero
let myEnemy

let enemyCards = []
let heroCards = []
// Parses all enemies from the API into a list that can be randomly drawn from for the next fight
// This list is updated after every enemy or player is killed
function buildCards(URL) {
    if (URL[0].points) {
        enemyCards = []
    }
    else {
        heroCards = []
    }
    for(const character of URL) {
        if(character.points){
            let enemy = new Enemy(character.id, character.name, character.hp, character.attack, character.points)
            enemyCards.push(enemy)
        } 
        else {
            let hero = new Hero(character.id, character.name, character.hp, character.attack)
            heroCards.push(hero)
        }
    }
}

// Randomly draws a character from the specified character list
function drawCard(cardDeck) {
    let totalCards = cardDeck.length
    let i = Math.floor(Math.random() * totalCards)
    let card = cardDeck[i]
    let characterDiv = document.createElement("div")
        characterDiv.className = "card"
    //Determines whether the card is for an enemy or a hero
    if (card instanceof Enemy) {
        myEnemy = card
        characterDiv.id = "enemy-card"
    }
    else {
        myHero = card
        characterDiv.id = "hero-card"
    }
    //Sets up a card object to appear as a div within the game area
    let char = document.createElement("ul")
        char.id = "name"
        char.innerText = card.name
        characterDiv.appendChild(char)

    let charHP = document.createElement("li")
        charHP.id = "hp"
        charHP.innerText = `HP: ${card.hp}`
        characterDiv.appendChild(charHP)

    let charImg = document.createElement("img")
        charImg.src = card.img
        characterDiv.appendChild(charImg)
        
    let charAtt = document.createElement("li")
        charAtt.id = "attack"
        charAtt.innerText = `Attack: ${card.attack}`
        characterDiv.appendChild(charAtt)

    gameArea.appendChild(characterDiv)
}

//Updates DOM with current Hero or Enemy HP values
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
    newEnemy[2].src = card.img
    newEnemy[3].innerText = `Attack: ${card.attack}`
}

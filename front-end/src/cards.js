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
    let char = document.createElement("h4")
        char.id = "name"
        char.class = "card-title"
        char.innerText = card.name
        characterDiv.appendChild(char)
    
    let charHP = document.createElement("p")
        charHP.className = "card-text"
        charHP.id = "hp"
        charHP.innerText = `HP: ${card.maxHP}`
        characterDiv.appendChild(charHP)
    
    let charHpBar = document.createElement("div")
        charHpBar.className = "progress"
        charHpBar.id = "progress"
    let barHealth = document.createElement("div")
        barHealth.id = "currentHP"
        barHealth.className = "progress-bar progress-bar-success"
        barHealth.style.width = `${(card.hp / card.maxHP) * 100}%`
        charHpBar.appendChild(barHealth)
        characterDiv.appendChild(charHpBar)
    
    let charImg = document.createElement("img")
        charImg.src = card.img
        charImg.className = "card-img-top"
        charImg.alt = "Custom image missing"
        characterDiv.appendChild(charImg)
    
    let charAtt = document.createElement("p")
        charAtt.className = "card-text"
        charAtt.id = "attack"
        charAtt.innerText = `Attack: ${card.attack}`
        characterDiv.appendChild(charAtt)

    gameArea.appendChild(characterDiv)
}

//Updates DOM with current Hero or Enemy HP values
function refreshCard(character) {
    if (character === "enemy") {
        let enemyCard = document.getElementById("enemy-card")
        enemyCard.children.hp.innerText = `HP: ${myEnemy.hp}`
        enemyCard.children.progress.firstChild.style.width = `${(myEnemy.hp / myEnemy.maxHP) * 100}%`
    }
    if (character === "player") {
        let heroCard = document.getElementById("hero-card")
        heroCard.children.hp.innerText = `HP: ${myHero.hp}`
        heroCard.children.progress.firstChild.style.width = `${(myHero.hp / myHero.maxHP) * 100}%`
    }

}

//Randomly draws another card from the enemyCard array and assigns it to the myEnemy variable
function drawNewEnemy(characterList) {
    let totalCards = characterList.length
    let i = Math.floor(Math.random() * totalCards)
    let card = characterList[i]
    myEnemy = card
    //Updates the DOM enemy-card with new Enemy info
    let newEnemy = document.getElementById("enemy-card").children
    newEnemy[0].innerText = card.name
    newEnemy[1].innerText = `HP: ${card.hp}`
    newEnemy.progress.firstChild.style.width = `100%`
    newEnemy[3].src = card.img
    newEnemy[4].innerText = `Attack: ${card.attack}`
}

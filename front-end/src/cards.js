// Parses all enemies from the API into a list that can be randomly drawn from for the next fight
function buildCards(list) {

    for(const character of list) {
        let characterDiv = document.createElement("div")
        characterDiv.className = "card"

        let char = document.createElement("ul")
        char.innerText = character.name
        characterDiv.appendChild(char)

        let charHP = document.createElement("li")
        charHP.innerText = `HP: ${character.hp}`
        characterDiv.appendChild(charHP)

        let charAtt = document.createElement("li")
        charAtt.innerText = `Attack: ${character.attack}`
        characterDiv.appendChild(charAtt)

        if(character.points){
            enemyCards.push(characterDiv)  
        } 
        else {
            heroCards.push(characterDiv)
        }
    }
}

// Randomly draws an character from the specified character list
function drawCard(characterList) {
    let totalCards = characterList.length
    let i = Math.floor(Math.random() * totalCards)
    gameArea.appendChild(characterList[i])
}

function buildHeroCard(list) {
    for(const hero of list) {
        let heroDiv = document.createElement("div")
        heroDiv.className = "card"

        let heroChar = document.createElement("ul")
        heroChar.innerText = hero.name
        heroDiv.appendChild(heroChar)

        let heroHp = document.createElement("li")
        heroHp.innerText = `HP: ${hero.hp}`
        heroChar.appendChild(heroHp)

        heroCards.push(heroDiv)  
    }
}
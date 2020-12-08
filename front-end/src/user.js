class User {
    constructor(id, username, score, top_score, scoreboard_id){
        this.id = id
        this.username = username
        this.score = score
        this.top_score = top_score
        this.scoreboard_id = scoreboard_id
    }

    static createOrSignInPlayer(name, game_id) {
        fetch(PLAYERS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: name, 
                scoreboard_id: game_id
            })
            
        })
        .then(response => response.json())
        .then(user => {
            const { id, username, score, top_score, scoreboard_id } = user
            currentPlayer = new User(id, username, score, top_score, scoreboard_id)
            currentPlayer.score = 0
        })
        .catch(function (error) {  
            console.log('Request failure: ', error);
        })
    }
    
    savePlayer() {
        let CURRENTPLAYER_URL = `http://localhost:3000/users/${this.id}`
    
        fetch(CURRENTPLAYER_URL, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: currentPlayer.username,
                top_score: currentPlayer.top_score
            })
        })
    }
}


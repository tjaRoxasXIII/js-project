# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Scoreboard.create(game_name: "Card Clash")

User.create(username: "The King", score: 500, top_score: 7500, scoreboard_id: 1)

Enemy.create(name: "Giant Spider", hp: 15, attack: 7, points: 200)
Enemy.create(name: "Orc", hp: 30, attack: 8, points: 600)
Enemy.create(name: "Thief", hp: 10, attack: 9, points: 500)
Enemy.create(name: "Wyvern", hp: 25, attack: 6, points: 400)
Enemy.create(name: "Slime", hp: 15, attack: 3, points: 300)

Hero.create(name: "Red", hp: 20, attack: 8)
Hero.create(name: "Blue", hp: 15, attack: 10)
Hero.create(name: "Green", hp: 30, attack: 6)
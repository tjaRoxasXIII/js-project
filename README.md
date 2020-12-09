# README

This application is a Rails-API backend which serves information to an HTML front-end through the use of Javascript fetches.  The intent is to replicate, on a very low level, the combat style of a Turn-based RPG.  To begin the application, please use the following instructions

# ToDo

1. Fork and clone down this repository
2. Within your terminal, navigate into the project's ```./back-end``` folder.
3. First run ```bundle-install``` to gather the application's dependencies.
4. Follow this by running ```rails db:migrate``` and (assuming you'd like to use my included resources) ```rails db:seed```
5. Start up the rails server with ```rails s``` and your data should be getting served up.  
6. Next move up a directory to locate the Index.html file and open that from within the browser.  The scoreboard should update with the test User from the seed data and the game is then ready to begin.
# Gif It To Me
Gif It To Me is a multiplayer, interactive board game that challenges players to write the funniest or most clever caption for a selection of animated gifs. Players take turns judging each round. The first player to make it to the tenth space is the winner. We came up with the idea for Gif It To Me during the time of the Covid-19 quarantine, as it allows people who are separated to connect with one another and play an exciting online game of judgement.

## Landing Page
![Start](/public/images/start.png?raw=true)
The landing page gives players the option to either start a game or join a game. If the player would like to create a game, they can input the name of a game that they would like to start and choose between three and six players. They may then press the 'start game' button, at which point they will be redirected to the gameboard page. The player who creates the game board is automatically designated as 'Player1.'
![Join](/public/images/join.png?raw=true)
If a Player wishes to join a game that already exists, they simply input the the name of the game into the 'join' input box and press the 'join game' button, which will redirect them to a gameboard that has already been created. players will be assigned 'Player2' through 'Player6' depending on the order in which they join the game.

## Gameplay
![Gameboard](/public/images/gameboard.png?raw=true)
The gameboard is arranged so that players move from space to space depending on who wins each round. The first player to reach the tenth space is the winner. The spaces contain gifs that are updated on a per-game basis (each time a new gameboard is created). Modals will pop up to guide gameplay.
![Ready](/public/images/module1.png?raw=true)
Once a player has entered the game room, a modal will appear that welcomes the player by their player number. There will also be a 'ready' button. Upon clicking this button, the modal will disappear. Once all players have pressed the ready button, gameplay can begin.
![Captioning](/public/images/module2.png?raw=true)
The first judge will be selected randomly. Players who are not judging now have the opportunity to caption a random gif (pulled from GIPHY). A modal will appear containing the gif to be captioned, as well as a timer counting down the amount of time they have before the captions are automatically submitted to the judge (40 seconds). While players are writing their captions, a modal appears on the judge's screen containing the gif being captioned as well as the amount of time remaining for the captioners.
![Judging](/public/images/module3.png?raw=true)
When the captions have been submitted, the judge will pick their favorite. A modal will appear with the gif that was just captioned with the list of captions appearing underneath. The judge makes their selection by clicking on the caption text.
![Judge Waiting](/public/images/module4.png?raw=true)
While the judge makes their selection, a modal appears for the other players that displays the gif they just captioned and informs them that the judge is currently choosing the winner for the round.
![Winner](/public/images/module5.png?raw=true)
Once the judge has made their selection, a modal will appear for all players displaying the round winner, the caption that was selected, and the gif that was captioned. This modal will disappear automatically after a short amount of time and whoever won the previous round will become the judge for the next round. This cycle will continue until one player reaches the final space, at which point a modal will appear declaring a final game winner.

## Technologies
MySQL, Sequelize, Socket.io, Materialize, Node.js, Express, Giphy API

## Creators
Evan LaFollette, Mark Stout, Kelly Thompson, Ashton Beaudoin

## Links
[Deployed Application](https://polar-savannah-75488.herokuapp.com/)
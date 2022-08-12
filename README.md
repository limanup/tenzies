# TENZIES GAME

#### Video Demo: <URL HERE>

#### Description:

Tenzies Game is a web based game built with MERN (MongoDB, Express, React, Node) stack, currently hosted on Heroku. The game can be played here: [tenzies-mern-stack.herokuapp.com/](https://tenzies-mern-stack.herokuapp.com/).

**HOW TO PLAY**: every player gets 10 dice rolled with random numbers on them, the player can choose to "freeze" some of the dice to keep the number on dice unchanged between rolls. The player's end goal is to use the least time to roll the dice until all dice are on the same number.

#### Details about how the game is built

Frontend interface is built with React v18 using Typescript. All codes are located in the /frontend/src folder. The main file is 'index.tsx', which renders the 'App' component and styles the webpage with 'style.css'. 'App.tsx' is where all routes/pages are designed and where all other components are consolidated.

Additional features:

-   [x] CSS: use dotted dice instead of number
-   [x] Track the number of rolls
-   [x] Track the time it took to win
-   [x] Save best time to localStorage
-   [x] use database to track each winner's records

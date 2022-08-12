# TENZIES GAME

#### Video Demo: <URL HERE>

#### Description:

Tenzies Game is a web based game app built with MERN (MongoDB, Express, React, Node) stack, currently hosted on Heroku. The game can be played here: [tenzies-mern-stack.herokuapp.com/](https://tenzies-mern-stack.herokuapp.com/).

**HOW TO PLAY**: every player gets 10 dice rolled with random numbers on them, the player can choose to "freeze" some of the dice to keep the number on dice unchanged between rolls. The player's end goal is to use the least time to roll the dice until all dice are on the same number.

**LEADERBOARD**: every player can save their game stats to an online database with their choice of pseudo name. The top 10 players' stats will be displayed on the 'leaderboard' page. Pseudo names cannot be duplicated on leaderboard, the app will give you an error message if you choose an empty or duplicated pseudo name.

#### How the game is built

**Frontend** interface is built with React v18 using Typescript.

-   All codes are located in the /frontend/src folder.
-   The main file is 'index.tsx', which renders the 'App' component and styles the webpage with 'style.css'.
-   'App.tsx' is where all routes/pages are defined and where all other components are consolidated.
-   One shared component among all pages is 'Header.tsx' which functions as the navigation bar that stays on top of the page at all time.
-   'TenziesGame.tsx' and 'Leaderboard.tsx' are the two pages for this app. 'TenziesGame.tsx' hosts the game interface and all components which make up of the game. 'Leaderboard.tsx' connects to an online database hosted on MongoDB and displays top 10 game records among all players.
-   Static string constants are defined and saved in 'Constants.tsx'.
-   React Contexts are used throughout the app to manage state gloablly, they are defined and saved in 'Context.tsx'.
-

Additional features:

-   [x] CSS: use dotted dice instead of number
-   [x] Track the number of rolls
-   [x] Track the time it took to win
-   [x] Save best time to localStorage
-   [x] use database to track each winner's records

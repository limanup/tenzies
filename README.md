# TENZIES GAME

#### Video Demo: <URL HERE>

#### Description:

Tenzies Game is a web based game app built with MERN (MongoDB, Express, React, Node) stack, currently hosted on Heroku. The game can be played here: [tenzies-mern-stack.herokuapp.com/](https://tenzies-mern-stack.herokuapp.com/).

**HOW TO PLAY**: every player gets 10 dice rolled with random numbers on them, the player can choose to "freeze" some of the dice to keep the number on dice unchanged between rolls. The player's end goal is to use the least time to roll the dice until all dice are on the same number.

**LEADERBOARD**: every player can save their game stats to an online database with their choice of pseudo name. The top 10 players' stats will be displayed on the 'leaderboard' page. Pseudo names cannot be duplicated on leaderboard, the app will give you an error message if you choose an empty or duplicated pseudo name.

#### How the game is built

**Frontend** interface is built with React v18 using Typescript.

-   All codes are located in the `/frontend/src` folder.
-   The main file is `index.tsx`, which renders the 'App' component and styles the webpage with `style.css`.
-   `App.tsx` is where all routes/pages are defined and where all other components are consolidated.
-   One shared component among all pages is `Header.tsx` which functions as the navigation bar that stays on top of the page at all time.
-   `TenziesGame.tsx` and `Leaderboard.tsx` are the two pages for this app. `TenziesGame.tsx` hosts the game interface and all components which make up of the game. `Leaderboard.tsx` connects to an online database hosted on MongoDB and displays top 10 game records among all players.
-   Static string constants are defined and saved in `Constants.tsx`.
-   React Contexts are used throughout the app to manage state gloablly, they are defined and saved in `Context.tsx`.
-   There are two features for this game app, which are `SaveRecord.tsx` for saving player's record to online database, and `ShowLiveStats.tsx` for displaying live game stats such as # of rolls currently used and the timer showing total time used in seconds currently.
-   In the two pages for this app, each page contains individual components which make up for the entire page.
    > -   `TenziesGame.tsx` page includes all the logic and functions behind the game. A couple of React hooks are used to make the game run as smooth as possible, including `useState`, `useEffect`, `useReducer` and `useContext.
    >     > -   `Dice.tsx` is a component repeatedly used in `TenziesGame.tsx`. It renders one die element for the game, there are total ten die elements in this game.
    >     > -   `ShowLiveStats.tsx` is a feature rendered in `TenziesGame.tsx` for displaying live game stats.
    >     > -   `BestRecord.tsx` is the component reaching out to MongoDB API for pulling the current best record in the database. The best record will be shown at the end of the game.
    >     > -   `WinResults.tsx` is the component displaying player's final game stats at the end of the game. It also renders the `BestRecord.tsx` component and the `SaveRecord.tsx` feature after the game ends.
    > -   `Leaderboard.tsx` page calls MongoDB API to pull the top 10 best records and renders `RecordTableRow.tsx` component to display those records as table rows for the leaderboard page.

**Backend** connection is built with Express and Node using Typescript as well.

-   All codes are located in the `/backend` folder.
-   The main file is `server.ts`, which sets up the connection to MongoDB using `mongoose` and points the routings to `record.route.ts` file in the `routes` folder using Express.
-   The URL to connect to MongoDB is stored in `.env` file and will not be shared on Github as it contains username and password information for the owner of the online database.
-   `db.ts` uses `dotenv` package to extract MongoDB URL from `.env` file.
-   `Record.ts` file in `Models` folder defines the Schema of the database and the collection name.
-   `record.route.ts` file in `routes` folder defines how data will be processed based on different routes and HTTP methods. For example, `/api/leaderboard` route with `GET` method will query top 10 records from the database but `POST` method will save player's record to the online database.

While the game was initially built with the frontend interface, with each die displaying numeric value only, and with no ability to track game stats, additional features such as below were added later on to improve the game experience.

-   [x] CSS: use dotted dice instead of number
-   [x] Track the number of rolls
-   [x] Track the time it took to win
-   [x] Save best time to some storage such as localStorage
-   [x] use online database to track each player's records

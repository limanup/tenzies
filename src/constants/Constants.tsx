import { createContext } from "react";

// URL
export const LeaderBoardURL: string = "http://localhost:4000/leaderboard";
export const BestRecordURL: string =
    "http://localhost:4000/leaderboard/bestrecord";

// static text
export const GameName: string = "Tenzies";
export const GameInstructions: string =
    "Roll until all dice are the same. Click each die to freeze it at its current value between rolls.";
export const NoDBConnection: string = "No connection to leaderboard database.";

// useContext to pass data thru component tree
export const GameContext = createContext({
    rollCount: 0,
    totalTimeUsed: 0,
    resetGame: () => {},
});

// useContext to check database connection
export const DBConnectContext = createContext({
    dbStatus: true,
    setDbStatus: (dbStatus: boolean) => {},
});

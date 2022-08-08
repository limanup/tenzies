import { createContext } from "react";

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

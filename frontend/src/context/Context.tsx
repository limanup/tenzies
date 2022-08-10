import { createContext } from "react";

export const GameContext = createContext({
    rollCount: 0,
    totalTimeUsed: 0,
    resetGame: () => {},
});

export const DBConnectContext = createContext({
    dbStatus: true,
    setDbStatus: (dbStatus: boolean) => {},
});

import {createContext} from "react"

export const LeaderBoardURL: string = "http://localhost:4000/leaderboard"
export const BestRecordURL: string = "http://localhost:4000/leaderboard/bestrecord"

export const GameName: string = "Tenzies"
export const GameInstructions: string = "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."

// useContext to pass data thru component tree
export const WinContext = createContext({
    rollCount: 0,
    totalTimeUsed: 0,
    resetGame: () => {}
});
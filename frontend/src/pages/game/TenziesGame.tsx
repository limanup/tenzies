import { useEffect, useReducer, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Dice from "./Dice";
import WinResults from "./WinResults";
import { GameContext } from "../../context/Context";
import { GameInstructions, GameName } from "../../constants/Constants";
import ShowLiveStats from "../../features/showlivestats/ShowLiveStats";

interface DieState {
    value: number;
    isHeld: boolean;
    id: string;
}

interface GameState {
    win: boolean;
    rollCount: number;
    startTime: number;
    totalTimeUsed: number;
}

const TenziesGame = () => {
    const [diceList, setDiceList] = useState(allNewDice());

    const diceElements = diceList.map((die) => (
        <Dice
            value={die.value}
            key={die.id}
            isHeld={die.isHeld}
            toggleHold={() => holdDice(die.id)}
        />
    ));

    const initialState: GameState = {
        win: false,
        rollCount: 0,
        startTime: Date.now(),
        totalTimeUsed: 0,
    };

    const [gameState, dispatch] = useReducer(reducer, initialState);

    // setInterval during game
    useEffect(() => {
        let intervalID: number;
        if (!gameState.win) {
            intervalID = window.setInterval(() => {
                dispatch({ type: "IncrementTime" });
            }, 1000);
        }

        return () => {
            clearInterval(intervalID);
        };
    }, [gameState.win]);

    // check win conditions on every Die update
    useEffect(() => {
        const diceValue: number = diceList[0].value;
        if (diceList.every((die) => die.isHeld && die.value === diceValue)) {
            dispatch({ type: "Won" });
        }
    }, [diceList]);

    /**
     * Functions
     */

    function generateRandomDie(): DieState {
        return {
            id: nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
        };
    }

    function allNewDice() {
        let diceList: DieState[] = [];

        for (let i: number = 0; i < 10; i++) {
            diceList.push(generateRandomDie());
        }

        return diceList;
    }

    function holdDice(id: string) {
        setDiceList((oldDice) =>
            oldDice.map((oldDie) =>
                oldDie.id === id
                    ? { ...oldDie, isHeld: !oldDie.isHeld }
                    : oldDie
            )
        );
    }

    function rollDice() {
        setDiceList((oldDice) =>
            oldDice.map((oldDie) =>
                oldDie.isHeld ? oldDie : generateRandomDie()
            )
        );
        dispatch({ type: "AddRollCount" });
    }

    function resetGame() {
        dispatch({ type: "ResetGame" });
    }

    function reducer(
        gameState: GameState,
        action: {
            type: "AddRollCount" | "IncrementTime" | "Won" | "ResetGame";
        }
    ) {
        switch (action.type) {
            // +1 to rollCount
            case "AddRollCount":
                return { ...gameState, rollCount: gameState.rollCount + 1 };
            // +1 second to totalTimeUsed
            case "IncrementTime":
                return {
                    ...gameState,
                    totalTimeUsed: gameState.totalTimeUsed + 1,
                };
            // set win status to true and get accurate totalTimeUsed if game won
            case "Won":
                return {
                    ...gameState,
                    win: true,
                    totalTimeUsed: (Date.now() - gameState.startTime) / 1000,
                };

            case "ResetGame":
                setDiceList(allNewDice());
                return initialState;
        }
    }

    return (
        <GameContext.Provider
            value={{
                rollCount: gameState.rollCount,
                totalTimeUsed: gameState.totalTimeUsed,
                resetGame: resetGame,
            }}
        >
            <div>
                {gameState.win && <Confetti />}
                <ShowLiveStats />
                <main>
                    <h1 className="title">{GameName}</h1>

                    {gameState.win && <WinResults />}

                    {!gameState.win && (
                        <p className="instructions">{GameInstructions}</p>
                    )}
                    <div className="dice-wrapper">{diceElements}</div>
                    <button
                        className="roll-btn"
                        type="button"
                        onClick={gameState.win ? resetGame : rollDice}
                    >
                        {gameState.win ? "New Game" : "Roll"}
                    </button>
                </main>
            </div>
        </GameContext.Provider>
    );
};

export default TenziesGame;

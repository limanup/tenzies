import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { GameInstructions, GameName, GameContext } from "../constants/Constants";
import Confetti from "react-confetti";
import Dice from "./Dice";
import WinResults from "./WinResults";

interface Die {
    value: number;
    isHeld: boolean;
    id: string;
}

const TenziesGame = ({timeNow}:{timeNow: number}) => {
    // initiate diceList
    const [diceList, setDiceList] = useState(allNewDice());

    // win stats
    const [win, setWin] = useState(false);
    const [rollCount, setRollCount] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());
    const [totalTimeUsed, setTotalTimeUsed] = useState(10);

    // map each die to Die component
    const diceElements = diceList.map((die) => (
        <Dice
            value={die.value}
            key={die.id}
            isHeld={die.isHeld}
            toggleHold={() => holdDice(die.id)}
        />
    ));

    // check win conditions on every Die update
    useEffect(() => {
        const diceValue: number = diceList[0].value;
        if (diceList.every((die) => die.isHeld && die.value === diceValue)) {
            setWin(true);

            // const timeUsed = (Date.now() - startTime) / 1000;
            setTotalTimeUsed((Date.now() - startTime) / 1000);
        }
    }, [diceList]);

    useEffect(() => {
        resetGame()
    }, [timeNow])

    /**
     * Functions
     */

    // function to generate random number
    function generateRandomDie(): Die {
        return {
            id: nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
        };
    }

    // roll all dice (10)
    function allNewDice() {
        let diceList: Die[] = [];

        for (let i: number = 0; i < 10; i++) {
            diceList.push(generateRandomDie());
        }

        return diceList;
    }

    // hold dice
    function holdDice(id: string) {
        setDiceList((oldDice) =>
            oldDice.map((oldDie) =>
                oldDie.id === id
                    ? { ...oldDie, isHeld: !oldDie.isHeld }
                    : oldDie
            )
        );
    }

    // roll unheld dice during game
    function rollDice() {
        setDiceList((oldDice) =>
            oldDice.map((oldDie) =>
                oldDie.isHeld ? oldDie : generateRandomDie()
            )
        );
        setRollCount((prevCount) => prevCount + 1);
    }

    // reset entire game
    function resetGame() {
        setWin(false);
        setDiceList(allNewDice());
        setRollCount(0);
        setStartTime(Date.now());
    }

    return (
        <main>
            {win && <Confetti />}
            <h1 className="title">{GameName}</h1>

            {win && (
                <GameContext.Provider
                    value={{
                        rollCount: rollCount,
                        totalTimeUsed: totalTimeUsed,
                        resetGame: resetGame,
                    }}
                >
                    <WinResults />
                </GameContext.Provider>
            )}

            {!win && <p className="instructions">{GameInstructions}</p>}
            <div className="dice-wrapper">{diceElements}</div>
            <button
                className="roll-btn"
                type="button"
                onClick={win ? resetGame : rollDice}
            >
                {win ? "New Game" : "Roll"}
            </button>
        </main>
    );
};

export default TenziesGame;

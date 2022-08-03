import React, { useEffect, useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

interface Die {
    value: number;
    isHeld: boolean;
    id: string;
}

function App() {
    const [diceArr, setDiceArr] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false);
    const [rollCount, setRollCount] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());
    const [totalTimeUsed, setTotalTimeUsed] = useState(0);
    const [localBestTime, setLocalBestTime] = useState(() =>
        parseFloat(localStorage.getItem("tenzies") || "0")
    );

    useEffect(() => {
        const winValue: number = diceArr[0].value;
        if (diceArr.every((die) => die.isHeld && die.value === winValue)) {
            setTenzies(true);
            setTotalTimeUsed((Date.now() - startTime) / 1000);
        }
    }, [diceArr]);

    useEffect(() => {
        if (
            totalTimeUsed > 0 &&
            (totalTimeUsed < localBestTime || localBestTime <= 0)
        ) {
            setLocalBestTime(totalTimeUsed);
            localStorage.setItem("tenzies", JSON.stringify(totalTimeUsed));
        }
    }, [tenzies]);

    const diceElements = diceArr.map((die) => (
        <Die
            value={die.value}
            key={die.id}
            isHeld={die.isHeld}
            toggleHold={() => holdDice(die.id)}
        />
    ));

    function generateRandomDie(): Die {
        return {
            id: nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
        };
    }

    function allNewDice() {
        let diceArr: Die[] = [];

        for (let i: number = 0; i < 10; i++) {
            diceArr.push(generateRandomDie());
        }

        return diceArr;
    }

    function rollDice() {
        if (tenzies) {
            setDiceArr(allNewDice());
            setTenzies(false);
            setRollCount(0);
            setStartTime(Date.now());
        } else {
            setDiceArr((oldDice) =>
                oldDice.map((oldDie) =>
                    oldDie.isHeld ? oldDie : generateRandomDie()
                )
            );
            setRollCount((prevCount) => prevCount + 1);
        }
    }

    function holdDice(id: string) {
        setDiceArr((oldDice) =>
            oldDice.map((oldDie) =>
                oldDie.id === id
                    ? { ...oldDie, isHeld: !oldDie.isHeld }
                    : oldDie
            )
        );
    }

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            {tenzies && (
                <div className="win-msg">
                    <h1>You won!</h1>
                    <p>
                        You rolled{" "}
                        <span style={{ color: "red" }}>{rollCount}</span> times.{" "}
                    </p>
                    <p>
                        You used{" "}
                        <span style={{ color: "red" }}>{totalTimeUsed}</span>{" "}
                        seconds.
                    </p>
                    <p>
                        {totalTimeUsed > localBestTime ? (
                            <span>
                                Best record is{" "}
                                <span style={{ color: "green" }}>
                                    {localBestTime}
                                </span>{" "}
                                seconds.
                            </span>
                        ) : (
                            "You made a new record!"
                        )}
                    </p>
                </div>
            )}
            {!tenzies && (
                <p className="instructions">
                    Roll until all dice are the same. Click each die to freeze
                    it at its current value between rolls.
                </p>
            )}
            <div className="dice-wrapper">{diceElements}</div>
            <button className="roll-btn" type="button" onClick={rollDice}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    );
}

export default App;

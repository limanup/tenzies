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

    useEffect(() => {
        const winValue: number = diceArr[0].value;
        if (diceArr.every((die) => die.isHeld && die.value === winValue)) {
            setTenzies(true);
            console.log("You won!");
        }
    }, [diceArr]);

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
        setDiceArr((oldDice) =>
            oldDice.map((oldDie) =>
                oldDie.isHeld ? oldDie : generateRandomDie()
            )
        );
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
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className="dice-wrapper">{diceElements}</div>
            <button className="roll-btn" type="button" onClick={rollDice}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    );
}

export default App;

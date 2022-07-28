import React, { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

interface Die {
    value: number;
    isHeld: boolean;
    id: string;
}

function App() {
    const [diceArr, setDiceArr] = useState(allNewDice());
    // console.log(diceArr)
    const diceElements = diceArr.map((die) => (
        <Die
            value={die.value}
            key={die.id}
            isHeld={die.isHeld}
            toggleHold={() => holdDice(die.id)}
        />
    ));
    // console.log(diceElements)

    function allNewDice() {
        let diceArr: Die[] = [];

        for (let i: number = 0; i < 10; i++) {
            diceArr.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid(),
            });
        }

        return diceArr;
    }

    function rollDice() {
        setDiceArr(allNewDice());
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

    // console.log(diceArr);

    return (
        <main>
            <div className="dice-wrapper">{diceElements}</div>
            <button className="roll-btn" type="button" onClick={rollDice}>
                Roll
            </button>
        </main>
    );
}

export default App;

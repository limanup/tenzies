import React, { useState } from "react";
import Die from "./components/Die";
import {nanoid} from "nanoid";
import { domainToUnicode } from "url";

function App() {
    const [diceArr, setDiceArr] = useState(allNewDice());
    // console.log(diceArr)
    const diceElements = diceArr.map((die) => (
        <Die value={die.value} key={die.id} isHeld={die.isHeld} />
    ));
    // console.log(diceElements)

    function allNewDice() {
        let diceArr: { value: number, isHeld: boolean, id: string }[] = [];

        for (let i: number = 0; i < 10; i++) {
            diceArr.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            });
        }

        return diceArr;
    }

    function rollDice() {
        setDiceArr(allNewDice());
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

import React, {useState} from "react";
import Die from "./components/Die";

function App() {
    function allNewDice() {
        let diceArr: number[] = [];

        for (let i: number = 0; i < 10; i++) {
            diceArr.push(Math.ceil(Math.random() * 6));
        }

        return diceArr;
    }

    const [diceArr, setDiceArr] = useState(allNewDice())
    // console.log(diceArr)

    const diceElements = diceArr.map((die) => (<Die value={die} />))
    // console.log(diceElements)

    return (
        <main>
            <div className="dice-wrapper">
              {diceElements}
            </div>
        </main>
    );
}

export default App;

import React from "react";
import Die from "./components/Die";

function App() {
    function allNewDice() {
        let diceArr: number[] = [];

        for (let i: number = 0; i < 10; i++) {
            diceArr.push(Math.ceil(Math.random() * 6));
        }

        return diceArr;
    }

    console.log(allNewDice())

    return (
        <main>
            <div className="dice-wrapper">
                <Die value={1} />
                <Die value={2} />
                <Die value={3} />
                <Die value={4} />
                <Die value={5} />
                <Die value={6} />
                <Die value={1} />
                <Die value={2} />
                <Die value={3} />
                <Die value={4} />
            </div>
        </main>
    );
}

export default App;

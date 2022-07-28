import React, { useState } from "react";
import Die from "./components/Die";

function App() {
  
  const [diceArr, setDiceArr] = useState(allNewDice());
  // console.log(diceArr)
  const diceElements = diceArr.map((die) => <Die value={die} />);
  // console.log(diceElements)
  
  function allNewDice() {
      let diceArr: number[] = [];

      for (let i: number = 0; i < 10; i++) {
          diceArr.push(Math.ceil(Math.random() * 6));
      }

      return diceArr;
  }

  function rollDice() {
    setDiceArr(allNewDice())
  }

    return (
        <main>
            <div className="dice-wrapper">{diceElements}</div>
            <button
                className="roll-btn"
                type="button"
                onClick={rollDice}
            >
                Roll
            </button>
        </main>
    );
}

export default App;

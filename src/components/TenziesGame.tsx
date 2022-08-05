import React, { useEffect, useState, createContext, useContext } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BestRecord from "./BestRecord";
import Dice from "./Dice";
import WinResults from "./WinResults";
import {WinContext} from "../constants/Constants"

interface Die {
    value: number;
    isHeld: boolean;
    id: string;
}

const TenziesGame = () => {
    // initiate diceList
    const [diceList, setDiceList] = useState(allNewDice());

    // win stats
    const [win, setWin] = useState(false);
    const [rollCount, setRollCount] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());
    const [totalTimeUsed, setTotalTimeUsed] = useState(10);

    const [bestRecord, setBestRecord] = useState();


    // check win conditions on every Die update
    useEffect(() => {
        const diceValue: number = diceList[0].value;
        if (diceList.every((die) => die.isHeld && die.value === diceValue)) {
            setWin(true);

            // const timeUsed = (Date.now() - startTime) / 1000;
            setTotalTimeUsed((Date.now() - startTime) / 1000);
        }
    }, [diceList]);

    // // update new record after a tenzie win
    // useEffect(() => {
    //     if (
    //         totalTimeUsed > 0 &&
    //         (totalTimeUsed < bestRecord || bestRecord <= 0)
    //     ) {
    //         setBestRecord(totalTimeUsed);
    //         // localStorage.setItem("tenzies", JSON.stringify(totalTimeUsed));
    //     }
    // }, [win]);

    // map each die to Die component
    const diceElements = diceList.map((die) => (
        <Dice
            value={die.value}
            key={die.id}
            isHeld={die.isHeld}
            toggleHold={() => holdDice(die.id)}
        />
    ));

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
            <h1 className="title">Tenzies</h1>

            {!win && (
                <WinContext.Provider
                    value={{
                        rollCount: rollCount,
                        totalTimeUsed: totalTimeUsed,
                        resetGame: resetGame
                    }}
                >
                    <WinResults />
                </WinContext.Provider>
            )}

            {!win && (
                <div>
                    <div className="win-msg">
                        <h1>You won!</h1>
                        <p>
                            You rolled{" "}
                            <span style={{ color: "red" }}>{rollCount}</span>{" "}
                            times.{" "}
                        </p>
                        <p>
                            You used{" "}
                            <span style={{ color: "red" }}>
                                {totalTimeUsed}
                            </span>{" "}
                            seconds.
                        </p>

                        {/* <BestRecord totalTimeUsed={totalTimeUsed} /> */}
                    </div>
                </div>
            )}
            {!win && (
                <p className="instructions">
                    Roll until all dice are the same. Click each die to freeze
                    it at its current value between rolls.
                </p>
            )}
            <div className="dice-wrapper">{diceElements}</div>
            <button className="roll-btn" type="button" onClick={rollDice}>
                {win ? "New Game" : "Roll"}
            </button>
        </main>
    );
};

export default TenziesGame;

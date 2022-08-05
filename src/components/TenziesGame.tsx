import React, { useEffect, useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BestRecord from "./BestRecord";


interface Die {
    value: number;
    isHeld: boolean;
    id: string;
}

const TenziesGame = () => {
    const navigate = useNavigate();
    const [diceArr, setDiceArr] = useState(allNewDice());
    const [rollCount, setRollCount] = useState(0);
    const [tenzies, setTenzies] = useState(false);
    const [startTime, setStartTime] = useState(Date.now());
    const [totalTimeUsed, setTotalTimeUsed] = useState(10);

    const [bestRecord, setBestRecord] = useState()
    const [record, setRecord] = useState({
        name: "",
        rollCount: 0,
        totalTimeUsed: 0,
    });


    // check win conditions
    useEffect(() => {
        const winValue: number = diceArr[0].value;
        if (diceArr.every((die) => die.isHeld && die.value === winValue)) {
            setTenzies(true);

            const timeUsed = (Date.now() - startTime) / 1000
            setTotalTimeUsed(timeUsed);
            
            const getBestRecord = async () => {
                await fetch("http://localhost:4000/leaderboard/bestrecord")
                    .then((res) => res.json())
                    .then((data) => {
                        setBestRecord(data?.totalTimeUsed || 0);
                    })
                    .catch((error) => console.log("Error: ", error));
            };
            getBestRecord().then(setBestRecord);

        }
    }, [diceArr, bestRecord]);

    // update new record after a tenzie win
    useEffect(() => {
        if (
            totalTimeUsed > 0 &&
            (totalTimeUsed < bestRecord || bestRecord <= 0)
        ) {
            setBestRecord(totalTimeUsed);
            // localStorage.setItem("tenzies", JSON.stringify(totalTimeUsed));
        }
    }, [tenzies]);

    // map each die to Die component
    const diceElements = diceArr.map((die) => (
        <Die
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
        let diceArr: Die[] = [];

        for (let i: number = 0; i < 10; i++) {
            diceArr.push(generateRandomDie());
        }

        return diceArr;
    }

    // roll dice during game
    function rollDice() {
        if (tenzies) {
            // start fresh after each win
            setTenzies(false);
            setDiceArr(allNewDice());
            setRollCount(0);
            setStartTime(Date.now());
            setRecord({
                name: "",
                rollCount: 0,
                totalTimeUsed: 0,
            });
        } else {
            // only rol the dice that are not held
            setDiceArr((oldDice) =>
                oldDice.map((oldDie) =>
                    oldDie.isHeld ? oldDie : generateRandomDie()
                )
            );
            setRollCount((prevCount) => prevCount + 1);

            // have we won game yet?
        }
    }

    // hold dice
    function holdDice(id: string) {

        // update hold map
        heldDice[id] = true


        // re-roll dice
        // 

        setDiceArr((oldDice) =>
            oldDice.map((oldDie) =>
                oldDie.id === id
                    ? { ...oldDie, isHeld: !oldDie.isHeld }
                    : oldDie
            )
        );
    }

    // save record to leaderboard
    async function saveRecord(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        if (!record.name) {
            alert("Must enter pseudo name to save record");
            return;
        } else if (record.totalTimeUsed === 0) {
            alert("Something went wrong, please refresh the page.");
            return;
        } else {
            const res = await fetch("http://localhost:4000/leaderboard", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(record),
            })
            if (res.status === 200) {
                console.log("Record added.")
            } else {
                alert()
                return
            }
                // .then((res) => {
                //     if (res.status === 200) {
                //         console.log("Record added.");
                //     } else {
                //         console.log("Promise rejected.");
                //         Promise.reject();
                //         return;
                //     }
                // })
                // .catch((err) => {
                //     console.log(err);
                //     return;
                // });


            // await axios
            //     .post("http://localhost:4000/leaderboard", record)
            //     .then((res) => {
            //         if (res.status === 200) {
            //             console.log("record added");
            //         } else {
            //             console.log("promise reject");
            //             Promise.reject();
            //         }
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //         return;
            //     });

            // start fresh after win
            rollDice();

            // go to leaderboard page
            navigate("/leaderboard");
        }
    }

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            {tenzies && (
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
                        <p>
                            {totalTimeUsed > bestRecord ? (
                                <BestRecord />
                            ) : (
                                "You made a new record!"
                            )}
                        </p>
                    </div>
                    <form>
                        <input
                            className="form-input"
                            type="text"
                            autoComplete="off"
                            placeholder="Pseudo name"
                            name="name"
                            value={record.name}
                            onChange={(e) =>
                                setRecord((oldRecord) => ({
                                    ...oldRecord,
                                    name: e.target.value,
                                    rollCount: rollCount,
                                    totalTimeUsed: totalTimeUsed,
                                }))
                            }
                        />
                        <button
                            className="form-submit"
                            onClick={(e) => saveRecord(e)}
                        >
                            Save my record
                        </button>
                    </form>
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
};

export default TenziesGame;

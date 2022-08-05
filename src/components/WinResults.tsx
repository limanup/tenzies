import { useContext } from "react";
import { WinContext } from "../constants/Constants";
import BestRecord from "./BestRecord";

const WinResults = () => {
    const props = useContext(WinContext);
    const rollCount = props.rollCount;
    const totalTimeUsed = props.totalTimeUsed;
    const resetGame = props.resetGame;
    return (
        <div className="win-msg">
            <h1>You won!</h1>
            <p>
                You rolled <span style={{ color: "red" }}>{rollCount}</span>{" "}
                times.{" "}
            </p>
            <p>
                You used <span style={{ color: "red" }}>{totalTimeUsed}</span>{" "}
                seconds.
            </p>
            <BestRecord />
        </div>
    );
};

export default WinResults;

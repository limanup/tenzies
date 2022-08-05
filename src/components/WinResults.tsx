import BestRecord from "./BestRecord";

const WinResults = ({rollCount}) => {
    return (
        <div>
            <div className="win-msg">
                <h1>You won!</h1>
                <p>
                    You rolled <span style={{ color: "red" }}>{rollCount}</span>{" "}
                    times.{" "}
                </p>
                <p>
                    You used{" "}
                    <span style={{ color: "red" }}>{totalTimeUsed}</span>{" "}
                    seconds.
                </p>

                <BestRecord totalTimeUsed={totalTimeUsed} />
            </div>
        </div>
    );
};

export default WinResults;

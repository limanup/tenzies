import { useContext } from "react";
import { DBConnectContext, NoDBConnection, WinContext } from "../constants/Constants";
import BestRecord from "./BestRecord";
import SaveRecord from "./SaveRecord";

const WinResults = () => {
    // get data from useContext
    const { rollCount, totalTimeUsed } = useContext(WinContext);

    // check database connection
    const { dbStatus } = useContext(DBConnectContext);

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
            {dbStatus ? (
                <div>
                    <BestRecord />
                    <br />
                    <SaveRecord />
                </div>
            ) : (
                <div>
                    <br />
                    <p className="status-msg">
                        {NoDBConnection}
                    </p>
                </div>
            )}
        </div>
    );
};

export default WinResults;

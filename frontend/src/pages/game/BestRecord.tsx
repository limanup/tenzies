import { useState, useEffect, useContext } from "react";
import { BestRecordURL } from "../../constants/Constants";
import { GameContext, DBConnectContext } from "../../context/Context";

const useBestRecordQuery = () => {
    const [bestRecord, setBestRecord] = useState(0);

    const { setDbStatus } = useContext(DBConnectContext);

    useEffect(() => {
        const getBestRecord = async () => {
            // try to get best record from leaderboard database
            try {
                const res = await fetch(BestRecordURL);
                if (res.status === 200) {
                    const data = await res.json();
                    setBestRecord(data?.totalTimeUsed || 0);
                } else {
                    // log status text if response status is not 200
                    console.log("Status text:", res.statusText);
                    throw new Error(`Status text: ${res.statusText}`);
                }
            } catch (err) {
                // no connection to database
                setDbStatus(false);
                throw new Error(String(err));
            }
        };
        getBestRecord();
    }, []);

    return bestRecord;
};

function BestRecord() {
    const bestRecord = useBestRecordQuery();
    const { totalTimeUsed } = useContext(GameContext);

    return (
        <p>
            {totalTimeUsed > bestRecord
                ? bestRecord > 0 && (
                      <span>
                          Best record is{" "}
                          <span style={{ color: "green" }}>{bestRecord}</span>{" "}
                          seconds.
                      </span>
                  )
                : "You made a new record!"}
        </p>
    );
}

export default BestRecord;

import { useState, useEffect, useContext } from "react";
import {
    BestRecordURL,
    DBConnectContext,
    WinContext,
} from "../constants/Constants";

// get best record from database
const useBestRecordQuery = () => {
    const [bestRecord, setBestRecord] = useState(0);

    // set dabatase connection status
    const { setDbStatus } = useContext(DBConnectContext);

    useEffect(() => {
        const getBestRecord = async () => {
            await fetch(BestRecordURL)
                .then((res) => res.json())
                .then((data) => {
                    setBestRecord(data?.totalTimeUsed || 0);
                    setDbStatus(true);
                })
                .catch((error) => console.log("Error: ", error));
        };
        getBestRecord();
    }, []);

    return bestRecord;
};

function BestRecord() {
    const bestRecord = useBestRecordQuery();
    const { totalTimeUsed } = useContext(WinContext);
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

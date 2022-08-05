import { useState, useEffect } from "react";
import { BestRecordURL } from "../constants/Constants";

// get best record from database
const useBestRecordQuery = () => {
    const [bestRecord, setBestRecord] = useState(0);

    useEffect(() => {
        const getBestRecord = async () => {
            await fetch(BestRecordURL)
                .then((res) => res.json())
                .then((data) => {
                    setBestRecord(data?.totalTimeUsed || 0);
                })
                .catch((error) => console.log("Error: ", error));
        };
        getBestRecord();
    }, []);

    return bestRecord;
};

function BestRecord(totalTimeUsed: number) {
    const bestRecord = useBestRecordQuery();
    return (
        <p>
            {totalTimeUsed > bestRecord} ?{" "}
            {bestRecord === 0 ? (
                <span>Loading...</span>
            ) : (
                <span>
                    Best record is{" "}
                    <span style={{ color: "green" }}>{bestRecord}</span>{" "}
                    seconds.
                </span>
            )}{" "}
            : ( "You made a new record!" )
        </p>
    );
}

export default BestRecord;

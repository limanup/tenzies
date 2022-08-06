import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    DBConnectContext,
    LeaderBoardURL,
    WinContext,
} from "../constants/Constants";

const SaveRecord = () => {
    // get data from useContext
    const { rollCount, totalTimeUsed, resetGame } = useContext(WinContext);

    // check database connection status
    const { dbStatus } = useContext(DBConnectContext);

    // compose record for adding to database
    const [record, setRecord] = useState({
        name: "",
        rollCount: rollCount,
        totalTimeUsed: totalTimeUsed,
    });
    console.log(record);

    // display status message
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    // save record to leaderboard database
    async function saveRecord(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        if (!record.name) {
            setStatus("Must enter pseudo name to save record!");
            return;
        } else if (record.totalTimeUsed === 0) {
            setStatus("Something went wrong, please refresh the page.");
            return;
        } else {
            const res = await fetch(LeaderBoardURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(record),
            });
            if (res.status === 200) {
                setStatus("Record added.");
                // resetGame;
                // go to leaderboard page
                // navigate("/leaderboard");
            } else if (dbStatus && res.status === 500) {
                setStatus("Duplicate pseudo name, please choose another name.");
                return;
            } else {
                setStatus("Record not added.");
                return;
            }

            // old code using fetch
            // fetch(LeaderBoardURL, {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(record),
            // });
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

            // old code using axios
            // await axios
            //     .post(LeaderBoardURL, record)
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
        }
    }

    return (
        <div>
            <label className="status-msg">{status}</label>
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
                        }))
                    }
                />
                <button className="form-submit" onClick={(e) => saveRecord(e)}>
                    Save my record
                </button>
            </form>
        </div>
    );
};

export default SaveRecord;

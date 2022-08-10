import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LeaderBoardURL } from "../../constants/Constants";
import { GameContext, DBConnectContext } from "../../context/Context";

const SaveRecord = () => {
    const { rollCount, totalTimeUsed, resetGame } = useContext(GameContext);

    const { dbStatus } = useContext(DBConnectContext);

    const [record, setRecord] = useState({
        name: "",
        rollCount: rollCount,
        totalTimeUsed: totalTimeUsed,
    });

    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const saveRecord = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!record.name) {
            setStatus("Must enter pseudo name to save record!");
            return;
        } else if (record.totalTimeUsed === 0) {
            setStatus("Something went wrong, please F5 to refresh the page.");
            return;
        } else {
            try {
                const res = await fetch(LeaderBoardURL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(record),
                });
                if (res.status === 200) {
                    setStatus("Record saved.");
                    resetGame();

                    navigate("/leaderboard");

                    // if connected to database but cannot insert record
                } else if (dbStatus && res.status === 500) {
                    setStatus(
                        "Duplicate pseudo name, please choose another name."
                    );
                    return;
                } else {
                    setStatus("Status text: " + res.statusText);
                    return;
                }
                // no connection to database
            } catch (err) {
                throw new Error(String(err));
            }
        }
    };

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

import { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import RecordTableRow from "./RecordTableRow";
import { LeaderBoardURL, NoDBConnection } from "../../constants/Constants";
import { DBConnectContext } from "../../context/Context";

const Leaderboard = () => {
    const [recordList, setRecordList] = useState([]);

    const { dbStatus, setDbStatus } = useContext(DBConnectContext);

    useEffect(() => {
        const getLeaderBoard = async () => {
            try {
                const res = await fetch(LeaderBoardURL);
                if (res.status === 200) {
                    const data = await res.json();
                    setDbStatus(true);
                    setRecordList(data);
                }

                if (!res.ok) {
                    throw new Error(`Error! statusText: ${res.statusText}`);
                }
                // no connection to database
            } catch (err) {
                setDbStatus(false);
                throw new Error(String(err));
            }
        };
        getLeaderBoard();
    }, []);

    const DataTable = () => {
        return recordList.map((res, i) => {
            return <RecordTableRow obj={res} key={i} row={i + 1} />;
        });
    };

    return (
        <div>
            <div className="game-stats"></div>
            <main className="table-wrapper">
                <Table bordered striped hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Pseudo name</th>
                            <th>Roll count</th>
                            <th>Total time used (seconds)</th>
                        </tr>
                    </thead>
                    <tbody>{DataTable()}</tbody>
                </Table>
                {!dbStatus && (
                    <label className="status-msg">{NoDBConnection}</label>
                )}
            </main>
        </div>
    );
};

export default Leaderboard;

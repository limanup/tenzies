import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import {
    DBConnectContext,
    LeaderBoardURL,
    NoDBConnection,
} from "../constants/Constants";
import RecordTableRow from "./RecordTableRow";

const Leaderboard = () => {
    const [recordList, setRecordList] = useState([]);

    // check and set database connection status
    const { dbStatus, setDbStatus } = useContext(DBConnectContext);

    useEffect(() => {
        axios
            .get(LeaderBoardURL)
            .then(({ data, status }) => {
                if (status === 200) {
                    setDbStatus(true)
                    console.log(dbStatus)
                }
                setRecordList(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const DataTable = () => {
        return recordList.map((res, i) => {
            return <RecordTableRow obj={res} key={i} row={i + 1} />;
        });
    };

    return (
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
            {!dbStatus && <label className="status-msg">{NoDBConnection}</label>}
        </main>
    );
};

export default Leaderboard;

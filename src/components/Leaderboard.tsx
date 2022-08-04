import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import RecordTableRow from "./RecordTableRow";

// interface Record {
//     name: string;
//     rollCount: number;
//     totalTimeUsed: number;
// }

const Leaderboard = () => {
    const [recordList, setRecordList] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/leaderboard")
            .then(({ data }) => {
                setRecordList(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const DataTable = () => {
        return recordList.map((res, i) => {
            return <RecordTableRow obj={res} key={i} row={i} />;
        });
    };

    return (
        <div className="table-wrapper">
            <Table striped bordered hover variant="dark">
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
        </div>
    );
};

export default Leaderboard;

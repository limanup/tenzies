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
        <main className="table-wrapper">
            <Table bordered striped hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Pseudo name</th>
                        <th>Roll count</th>
                        <th>Total time used (seconds)</th>
                    </tr>
                    <tr>
                        <td>{1}</td>
                        <td>test</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>

                </thead>
                <tbody>{DataTable()}</tbody>
            </Table>
        </main>
    );
};

export default Leaderboard;

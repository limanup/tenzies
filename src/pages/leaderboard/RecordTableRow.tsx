const RecordTableRow = (props: {
    obj: { name: string; rollCount: number; totalTimeUsed: number };
    row: number;
}) => {
    const { name, rollCount, totalTimeUsed } = props.obj;
    return (
        <tr>
            <td>{props.row}</td>
            <td>{name}</td>
            <td>{rollCount}</td>
            <td>{totalTimeUsed}</td>
        </tr>
    );
};

export default RecordTableRow;

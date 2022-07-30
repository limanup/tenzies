import React from "react";

export default function Die({
    value,
    isHeld,
    toggleHold,
}: {
    value: number;
    isHeld: boolean;
    toggleHold: React.MouseEventHandler<HTMLDivElement>;
}) {
    return (
        // <div className={`die isHeld-${String(isHeld)}`} onClick={toggleHold}>
        //     {/* <div className="die" style={{backgroundColor: isHeld ? "#59E391" : "white"}}> */}
        //     {value}
        // </div>
        <div
            className={`die isHeld-${String(isHeld)} die-${String(value)}`}
            onClick={toggleHold}
        ></div>
    );
}

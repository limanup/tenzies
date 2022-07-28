import React from "react"

export default function Die({value, isHeld}: {value: number, isHeld: boolean}) {
    return (
        <div className={`die isHeld-${String(isHeld)}`}>
        {/* <div className="die" style={{backgroundColor: isHeld ? "#59E391" : "white"}}> */}
            {value}
        </div>
    )
}
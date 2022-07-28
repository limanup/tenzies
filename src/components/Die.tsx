import React from "react"

export default function Die({value}: {value: number}) {
    return (
        <div className="die">
            {value}
        </div>
    )
}
import React from "react"

export default function Die({value}: {value: 1 | 2 | 3 | 4 | 5 | 6}) {
    return (
        <div className="die">
            {value}
        </div>
    )
}
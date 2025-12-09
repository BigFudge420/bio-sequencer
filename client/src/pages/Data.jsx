import React from "react";

export default function Data({data}) {
    console.log(data)
    const header = data.header
    const sequence = data.sequence

    return (
        <div>
            <h2>Analysis</h2>
            <div>
                <p>{header}</p>
                <pre>{sequence}</pre>
            </div>
        </div>
    )
}
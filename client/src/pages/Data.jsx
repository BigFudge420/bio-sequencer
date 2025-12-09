import React from "react";

export default function Data({data}) {
    console.log(data)
    const msg = data.message

    return (
        <div>
            <h2>Analysis</h2>
            <div>
                <p>{msg}</p>
            </div>
        </div>
    )
}
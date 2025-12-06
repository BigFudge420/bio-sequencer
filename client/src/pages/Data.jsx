import React from "react";

export default function Data({data}) {
    console.log(data)
    const sequence = data.sequence

    return (
        <div>
            <h2>Analysis</h2>
            <div>
                <strong>Label : {sequence.label}</strong>
                <p>Sequence : {sequence.seq}</p>
                <p>Length : {sequence.length}</p>
                <p>GC Content : {sequence.gc_content}</p>
                <p>Sequence Type : {sequence.seq_type}</p>
                {data.orfs.map((orf) => (                
                    <div>
                        <strong>ORF Label: {orf.label}</strong>
                        <p>Protein : {orf.protein}</p>
                    </div>
                    ))
                }
            </div>
        </div>
    )
}
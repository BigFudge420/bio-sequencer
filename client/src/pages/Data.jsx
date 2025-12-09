import React from "react";

export default function Data({data}) {
    console.log(data)

    const seq_obj = data.sequence
    const seq = seq_obj.seq 
    const gc_content = seq_obj.gc_content
    const length = seq_obj.length
    const nucleotide_counts = seq_obj.nucleotide_count
    const label = seq_obj.label

    const orf_list = data.orfs

    return (
        <div>
            <h2>Analysis</h2>
            <div>
               <h3>{label}</h3>
                <p>Length: {length}</p>
                <p>GC Content: {gc_content.toFixed(2)}%</p>
                <h4>Nucleotide Counts:</h4>
                <ul>
                    {Object.entries(nucleotide_counts).map(([nuc, count]) => (
                        <li key={nuc}>{nuc}: {count}</li>
                    ))}
                </ul>
                <strong>{seq}</strong>
                <h4>Open Reading Frames (ORFs):</h4>
                <ul>
                    {orf_list.map((orf, index) => (
                        <li key={index}>
                            <strong>{orf.label}:</strong> {orf.protein} (Start: {orf.start}, End: {orf.end})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
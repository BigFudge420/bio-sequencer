import React from "react";
import { useState } from "react";

export default function Input({ setSubmitted, setData }) {
    const [seq, setSeq] = useState('ACTG')
    const [label, setLabel] = useState('No label')
    const [seqType, setSeqType] = useState('DNA')

    const API_URL = import.meta.env.VITE_API_URL

    console.log("import.meta.env in Input.jsx:", import.meta.env);
    console.log("API_URL in Input.jsx:", API_URL);
    
    const fetchData = async (seq, label, seqType) => {
        try {
            const res = await fetch(`${API_URL}/analyse`, {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body : JSON.stringify({
                    seq : seq,
                    seq_type : seqType,
                    label : label
                })
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
    
            const data = await res.json()
            setData(data)
            setSubmitted(true)
        }
        catch (err) {
            console.error('Fetch failed: ', err)
        }

    }

    return (
        <div className="form">
            <h2>Enter the details of your sequence</h2>
            <div className="input-container">
                <label htmlFor="seq">Enter a sequence to analyze</label>
                <input 
                    id="seq" 
                    className="seq-input input" 
                    type="text"
                    onChange={(e) => setSeq(e.target.value)}
                />
            </div>
            <div className="input-container">
                <label htmlFor="label">Label the sequence</label>
                <input 
                    id="label"
                    className="label-input input"
                    type="text" 
                    onChange={(e) => setLabel(e.target.value)}
                />
            </div>
            <div className="input-container">
                <label htmlFor="seq-type">Enter a sequence type</label>
                <select 
                    name="seq-type" 
                    id="seq-type" 
                    className="type-input input"
                    onChange={(e) => setSeqType(e.target.value)}
                >
                    <option value="DNA">DNA</option>
                    <option value="RNA">RNA</option>
                </select>
            </div>
            <button 
                className="submit-btn"
                onClick={() => fetchData(seq, label, seqType)}
            >
                Analyse
            </button>
        </div>
    )
}
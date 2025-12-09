import React from "react";
import { useState } from "react";

export default function Input({ setSubmitted, setData }) {
    const [seqType, setSeqType] = useState('DNA')
    const [formData, setFormData] = useState(null)

    const API_URL = import.meta.env.VITE_API_URL
    const MAX_BYTES = 5000000
    const ALLOWED_EXTENSIONS = ['.fasta', '.fa', '.txt']

    console.log("import.meta.env in Input.jsx:", import.meta.env);
    console.log("API_URL in Input.jsx:", API_URL);
    
    const handleUpload = (file) => {
        

        const form = new FormData()
        form.append('file', file)
        form.append('seq_type', seqType)
        setFormData(form)
    }

    const fetchData = async () => {
        try {
            const res = await fetch(`${API_URL}/analyse`, {
                method: 'POST',
                body : formData
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
                <label htmlFor="file">Choose a file to analyze</label>
                <input 
                    id="file" 
                    className="file input" 
                    type="file"
                    accept=".fa,.fasta,.txt"
                    onChange={(e) => handleUpload(e.target.files[0])}
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
                onClick={() => fetchData()}
            >
                Analyse
            </button>
        </div>
    )
}
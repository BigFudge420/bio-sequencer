import React from "react";
import { useState } from "react";
import '../utilities/showError'
import showError from "../utilities/showError"
import validateFile from "../utilities/validateFile"
import setPreview from "../utilities/setPreview"

export default function Input({ setSubmitted, setData }) {
    const [seqType, setSeqType] = useState('DNA')
    const [formData, setFormData] = useState(null)
    const [previewData, setPreviewData] = useState(null)
    const [headerData, setHeaderData] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const API_URL = import.meta.env.VITE_API_URL
    const MAX_BYTES = 5000000
    const ALLOWED_EXTENSIONS = ['.fasta', '.fa', '.txt']

    console.log("import.meta.env in Input.jsx:", import.meta.env);
    console.log("API_URL in Input.jsx:", API_URL);

    const handleUpload = (file) => {
        validateFile(file, ALLOWED_EXTENSIONS, MAX_BYTES)

        setPreview(file, setPreviewData, setHeaderData)

        const form = new FormData()
        form.append('file', file)
        form.append('seq_type', seqType)
        setFormData(form)
    }

    const fetchData = async () => {
        setIsSubmitted(true)

        try {
            const res = await fetch(`${API_URL}/analyse`, {
                method: 'POST',
                body: formData
            })

            if (!res.ok) {
                const err = await res.json()
                showError(res.status, err.detail)
            }

            const data = await res.json()
            setData(data.result)
            setIsSubmitted(false)
            setSubmitted(true)

            console.log('Response data: ', data)
        }
        catch (err) {
            setIsSubmitted(false)
            console.error('Fetch failed: ', err)
        }

    }

    return (
        <div className="form">
            <h2 className="bg-black text-white">Enter the details of your sequence</h2>
            {previewData && (
                <div>
                    <p>PREVIEW</p>
                    <p>{headerData}</p>
                    <p>{previewData}...</p>
                </div>
            )}
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
                disabled={isSubmitted || !formData}
                onClick={() => fetchData()}
            >
                Analyse
            </button>
        </div>
    )
}
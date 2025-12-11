import React from "react";
import { useState } from "react";
import showError from "../utilities/showError"
import Header from "../components/Header";
import FileUploader from "../components/FileUploader";

export default function Input({ setSubmitted, setData }) {
    const [formData, setFormData] = useState(null)
    const [previewData, setPreviewData] = useState(null)
    const [headerData, setHeaderData] = useState(null)

    const API_URL = import.meta.env.VITE_API_URL
    
    const fetchData = async () => {
        
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
            setSubmitted(true)
            setData(data.result)
            setSubmitted(true)

        }
        catch (err) {
            console.error('Fetch failed: ', err)
        }

    }

    return (
        <div className="text-white flex min-h-screen min-w-screen flex-col items-center">
            <Header />
            <FileUploader fetchData={fetchData} setFormData={setFormData} setPreviewData={setPreviewData} setHeaderData={setHeaderData}/>
        </div> 
        )
}
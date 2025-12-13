import React, { useRef } from "react";
import axios from 'axios'
import { useState } from "react";
import showError from "../utilities/showError"
import Header from "../components/Header";
import FileUploader from "../components/FileUploader";
import UploadButton from "../components/UploadButton";
import FileDetails from "../components/FileDetails";

export default function Input({ setData, setResReceived }) {
    const [previewData, setPreviewData] = useState([])
    const [headerData, setHeaderData] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [files, setFiles] = useState([])
    const inputRef = useRef()
    const formDataRef = useRef(new FormData()) 

    const API_URL = import.meta.env.VITE_API_URL

    const appendToForm = (k, v) => {
        formDataRef.current.append(k, v)
    }
    
    const fetchData = async () => {
        const form = formDataRef.current

        try {
            setIsUploading(true)
            const res = await axios.post(`${API_URL}/analyse`, form, {
                onUploadProgress : (e) => {
                    if(e.lengthComputable) {
                        let pct = e.loaded/e.total * 100
                        setProgress(pct)
                    } 
                }
            })

            const data = res.data
            setSubmitted(true)
            setData(data.result)
            setSubmitted(true)
            setResReceived(true)

        }
        catch (error) {
            console.error('Fetch failed: ', error)
            if (error.response) {
                const status = error.response.status
                const serverMessage = error.response.data?.message || error.response.data

                showError(status, serverMessage)
            }
            else if(error.request) {
                showError(500, 'No response received')
            }
            
            showError(500, error)
        }    
    }

    return (
        <div className="text-white flex gap-4 min-h-screen min-w-screen flex-col items-center mb-2">
            <Header />
            <FileUploader fetchData={fetchData} setFiles={setFiles} inputRef={inputRef} appendToForm={appendToForm} setPreviewData={setPreviewData} setHeaderData={setHeaderData} setSubmitted={setSubmitted}/>
            <FileDetails inputRef={inputRef} progress={progress} fetchData={fetchData} formDataRef={formDataRef} files={files} appendToForm={appendToForm} setFiles={setFiles}/>
        </div> 
        )
}
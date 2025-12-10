import React from "react";
import { useState } from "react";
import '../utilities/showError'
import showError from "../utilities/showError"
import validateFile from "../utilities/validateFile"
import setPreview from "../utilities/setPreview"
import {motion} from 'motion/react'
import Dna from '../svgs/Dna'

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
        <motion.div
            initial = {{opacity: 0, y : 20}}
            animate = {{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="text-white flex min-h-screen"
        >

            <div className="grid grid-cols-5 grid-rows-2 gap-4 w-full h-screen text-center">
                <div className="col-span-5 gap-5 flex flex-col items-center p-[2.5rem]">
                   <Dna className="shadow-[2px_2px_100px_1px_rgba(30,200,255,0.7)] rounded-xl" />
                    <strong className="text-xl text-[#005cff]">Ribosome: Next-Gen Sequencer</strong>
                    <p className="text-2xl text-[#90A1B9]">Advanced genomic data processing platform</p>
                </div>
                <div className="col-span-3 row-start-2">2</div>
                <div className="col-span-2 col-start-4 row-start-2">3</div>
            </div>
    
        </motion.div> )
}
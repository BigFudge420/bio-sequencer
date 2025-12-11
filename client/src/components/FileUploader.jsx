import { motion } from "motion/react"
import { useState } from "react"
import Upload from "../svgs/Upload"
import validateFile from "../utilities/validateFile"
import setPreview from "../utilities/setPreview"

export default function FileUploader({fetchData, setFormData, setPreviewData, setHeaderData}) {
    const [seqType, setSeqType] = useState('DNA')
    const [btnHover, setBtnHover] = useState(false)
    const [isFull, setIsFull] = useState(false)
    const EXTENSIONS = ['.FASTA', '.FA', '.TXT']
    const MAX_BYTES = 5000000
    const ALLOWED_EXTENSIONS = ['.fasta', '.fa', '.txt']

    const handleUpload = (files) => {
        let file = files[0]

        validateFile(file, ALLOWED_EXTENSIONS, MAX_BYTES)
        setPreview(file, setPreviewData, setHeaderData)

        const form = new FormData()
        form.append('file', file)
        form.append('seq_type', 'DNA')
        setFormData(form)

        setIsFull(true)
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}   
            animate={{ opacity: 1, y: 0 }}      
            transition={{ duration: 0.5 }}
            className=" group"
        >   
            <div className="absolute min-w-[18.75rem] w-[62.5rem] 
            min-h-[9.37rem] h-[31.25rem] opacity-0 group-hover:opacity-50 bg-gradient-to-r 
            from-cyan-500 via-blue-500 to-purple-600 rounded-3xl blur-xl transition-opacity 
            duration-500">            
            </div>
            
            <div className="min-w-[18.75rem] flex flex-col text-center
            gap-7 items-center w-[62.5rem] min-h-[9.37rem] h-[31.25rem] bg-white/5 
            backdrop-blur-xl border-2 border-white/10 hover:border-white/20 
            rounded-2xl p-12 transition-all duration-300">
               
                <motion.div
                onHoverStart={() => setBtnHover(true)} onHoverEnd={() => setBtnHover(false)} animate={ btnHover? {scale: [1, 1.1, 1], rotate: [0, 5, -5, 0]} : {scale: 1, rotate: 0}}
                >               
                    <Upload className={"shadow-[2px_2px_60px_5px_rgba(30,200,255,0.5)] rounded-xl"}/>
                
                </motion.div>

                <p className="text-xl text-white/90">Drop Your Sequence Files</p>
               
                <p className="max-w-[25rem] text-gray-400">Drag and drop genomic data files or click to browse your system</p>

                <input type="file" id="file-upload" accept=".fasta, .fa, .txt" onChange={(e) => handleUpload(e.target.files)} hidden/>

                <div className="flex gap-2">
                    
                    <motion.button className={`w-[10rem] h-[3rem] bg-gradient-to-r from-cyan-500 to 
                    to-blue-500 rounded-xl font-bold ${isFull ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-70'}`}
                    whileHover={isFull ? {} : {scale: 1.05}} whileTap={isFull ? {} : {scale : 0.95}} disabled={isFull} type="button"
                    onClick={(e) => {
                        e.preventDefault()
                        document.getElementById('file-upload')?.click()
                    }}>
                        Select Files
                    </motion.button>

                    <motion.button className={`w-[10rem] h-[3rem] bg-gradient-to-r from-fuchsia-500 to 
                    to-purple-600 rounded-xl font-bold ${!isFull ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-70'}`}
                    whileHover={!isFull ? {} : {scale: 1.05}} whileTap={!isFull ? {} : {scale : 0.95}} disabled={!isFull} type="button"
                    onClick={() => fetchData()}>
                        Upload Files
                    </motion.button>


                </div>

                <div className="flex gap-3">
                    {EXTENSIONS.map((format) => (
                        <div key={format} className="bg-white/10 backdrop-blur-1 px-2 py-1 rounded-lg text-center border-2 border-white/20">
                            {format}
                        </div>
                    ))}
                </div>
            
            </div>
        
        </motion.div>
    )
}
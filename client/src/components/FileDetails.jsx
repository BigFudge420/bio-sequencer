import FileText from "../svgs/FileText"
import CircleCheck from '../svgs/CircleCheck'
import SelectEl from '../components/SelectEl'
import { useState } from "react"
import ClearAllBtn from "./ClearAllBtn"
import UploadButton from './UploadButton'
import DeleteFileBtn from "./DeleteFileBtn"


export default function FileDetails({formDataRef, inputRef, fetchData ,progress, files, appendToForm, isUploading, setFiles}) {
    const [hoverId, setHoverId] = useState(null)
    const showFile = files.length > 0 && progress === 0

    return (
        <>
            {(!isUploading && showFile) && 
            <div className="group">
                <div className="absolute opacity-0 group-hover:opacity-50 rounded-3xl blur-xl transition-opacity 
                duration-500 bg-white bg-gradient-to-r from-blue-600 via-purple-500 to-purple-700 h-[14rem] min-w-[18.75rem] w-[62.5rem]">
                </div>
                <div className="flex flex-col backdrop-blur-xl border-2 border-white/10 rounded-2xl bg-white/5 min-w-[18.75rem] w-[62.5rem] text-white">
                    <div className="flex justify-between items-center border-white/10 border-b-2 p-4">
                        <div className="flex flex-col gap-1">
                            <p className="text-xl">Selected Files</p>
                            <p className="text-white/50 text-sm">1 file selected</p>
                        </div>
                        <div className="flex gap-3">
                            <UploadButton fetchData={fetchData}/>
                            <ClearAllBtn formDataRef={formDataRef} inputRef={inputRef} setFiles={setFiles}/>
                        </div>
                    </div>
                    {files.map((file) => (
                        <div   key={file.fileId} className="flex p-6 items-center justify-between hover:bg-white/10 rounded-b-xl" onMouseEnter={() => setHoverId(file.fileId)} onMouseLeave={() => setHoverId(null)}>
                            <div>
                                <div className="relative flex items-center justify-center gap-6">
                                    <button className="border-[1px] w-12 h-12 shadow-[2px_2px_30px_1px_rgba(30,200,255,0.5)] bg-[#00C8E8]/30 flex justify-center items-center 
                                    border-[#00C8E8] rounded-xl"><FileText /></button>
                                    <div className="flex flex-col gap-1 justify-center">
                                        <p className="text-xl">{file.fileObj.name}</p>
                                        <div className="flex gap-3 items-center text-sm text-white/60">
                                            <p className="text-md">{((file.fileObj.size)/1000).toFixed(2)} KB</p>
                                            <div className="w-1 h-1 bg-white/40 mb-0.5 rounded-full"></div>
                                            <div className="bg-white/10 backdrop-blur-1 px-1.5 py-0 rounded-md text-center border-[1px] border-white/20">{file.fileObj.name.split('.').pop()}</div>
                                            <div className="w-1 h-1 bg-white/40 mb-0.5 rounded-full"></div>
                                            <p className="text-md text-green-500">Ready for analysis</p>
                                        </div>
                                    </div>
                                    <div className="absolute left-96">
                                        <SelectEl appendToForm={appendToForm}/>
                                    </div>
                                </div>
                            </div>
                            {hoverId === file.fileId 
                            ? <DeleteFileBtn inputRef={inputRef} fileId={file.fileId} formDataRef={formDataRef} setFiles={setFiles} />
                            : <CircleCheck/>
                            }
                        </div>                    
                    ))}
                </div>
            </div>
            }
        </>
    )
}

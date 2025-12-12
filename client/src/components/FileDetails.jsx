import { motion, scale } from "motion/react"
import FileText from "../svgs/FileText"
import CircleCheck from '../svgs/CircleCheck'
import SelectEl from '../components/SelectEl'
import { useState } from "react"

export default function FileDetails({formDataRef, progress, files, appendToForm}) {
    const [showDel, setShowDel] = useState(false)
    
    let file = formDataRef.current?.get('file')
    if (!file) return <div></div>
    
    let showFile = false
    
    if (progress === 0) {
        showFile = true
    }

    return (
        <div className="group">
            <div className="absolute opacity-0 group-hover:opacity-50 rounded-3xl blur-xl transition-opacity 
            duration-500 bg-white bg-gradient-to-r from-blue-600 via-purple-500 to-purple-700 h-[14rem] min-w-[18.75rem] w-[62.5rem]">
            </div>
            <div className="flex flex-col backdrop-blur-xl border-2 border-white/10 h-[12.5 rem] rounded-2xl bg-white/5 min-w-[18.75rem] w-[62.5rem] text-white">
                <div className="flex justify-between items-center border-white/10 border-b-2 p-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-xl">Selected Files</p>
                        <p className="text-white/50 text-sm">1 file selected</p>
                    </div>
                    <motion.button className='border-[1px] rounded-xl border-white/10 px-4 py-2 hover:text-red-500/80 hover:bg-red-500/20 hover:border-red-300/20'
                    whileHover={{scale : 1.05}}>
                        Clear all
                    </motion.button>
                </div>
                { showFile && files.map((file) => (
                    <div className="flex p-6 items-center justify-between hover:bg-white/10 rounded-b-xl" onMouseEnter={() => setShowDel(true)} onMouseLeave={() => setShowDel(false)}>
                        <div>
                            <div className="flex items-center justify-center gap-6">
                                <button className="border-[1px] w-12 h-12 shadow-[2px_2px_30px_1px_rgba(30,200,255,0.5)] bg-[#00C8E8]/30 flex justify-center items-center 
                                border-[#00C8E8] rounded-xl"><FileText /></button>
                                <div className="flex flex-col gap-1 justify-center">
                                    <p className="text-xl">{file.fileObj.name}</p>
                                    <div className="flex gap-3 items-center text-sm text-white/60">
                                        <p className="text-md">{((file.fileObj.size)/1000).toFixed(2)} KB</p>
                                        <div class="w-1 h-1 bg-white/40 mb-0.5 rounded-full"></div>
                                        <div className="bg-white/10 backdrop-blur-1 px-1.5 py-0 rounded-md text-center border-[1px] border-white/20">{file.fileObj.name.split('.').pop()}</div>
                                        <div class="w-1 h-1 bg-white/40 mb-0.5 rounded-full"></div>
                                        <p className="text-md text-green-500">Ready for analysis</p>
                                    </div>
                                </div>
                                <SelectEl appendToForm={appendToForm}/>
                            </div>
                        </div>
                        {showDel 
                        ? <div></div>
                        : <CircleCheck/>
                        }
                    </div>                    
                ))
                }
                {!showFile && 
                <div>
                    
                </div>
                }
            </div>
        </div>
    )
}

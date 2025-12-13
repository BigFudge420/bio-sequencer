import { motion } from "motion/react"

export default function ClearAllBtn({formDataRef, setFiles, inputRef}) {
    const clearAllFiles = () => {
        const input = inputRef.current
        input.value = ''

        formDataRef.current.delete('file')
        formDataRef.current.delete('seq_type')

        setFiles([])
    }

    return (
        <motion.button className='border-[1px] rounded-xl border-white/10 px-4 py-2.5 hover:text-red-500/80 hover:bg-red-500/20 hover:border-red-300/20'
        whileHover={{scale : 1.05}} onClick={clearAllFiles}>
            Clear all
        </motion.button>
    )
}
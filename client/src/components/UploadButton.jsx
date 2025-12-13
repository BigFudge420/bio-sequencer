import { motion } from "motion/react"

export default function UploadButton({fetchData}) {
    return (
        <motion.button className={`px-4 bg-gradient-to-r from-fuchsia-500 to 
        to-purple-600 rounded-xl font-bold ${false ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-70'}`}
        whileHover={false ? {} : {scale: 1.05}} whileTap={false ? {} : {scale : 0.95}} disabled={false} type="button"
        onClick={() => fetchData()}>
            Upload Files
        </motion.button>
    )
}
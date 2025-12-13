import Trash from '../svgs/Trash'

export default function DeleteFileBtn({formDataRef, setFiles, inputRef, fileId}) {
    const deleteFile = (fileId) => {
        formDataRef.current.delete('file')
        formDataRef.current.delete('seq_type')

        setFiles((prev) => {
            const next = prev.filter(f => f.fileId !== fileId)

            if (next.length === 0 && inputRef.current) {
                inputRef.current.value = ''
            }

            return next
        })
    }

    return (
        <button className='bg-red-600/30 p-1 pb-1.5 rounded-md' onClick={() => deleteFile(fileId)}>
            <Trash />
        </button>
    )
}
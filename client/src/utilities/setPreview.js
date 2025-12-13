export default async function setPreview(file, setPreviewData, setHeaderData) {
        const fileObj = file.fileObj
        const fileId = file.fileId
        const text = await fileObj.slice(0, 160).text()
        const lines = text.split('\n')
        const headerText = lines.find(line => line.startsWith('>')) || 'SEQ_01'
        const previewText = lines.filter(line => !line.startsWith('>')).join('')
        const preview = {fileId, previewText}
        const header = {fileId, headerText}

        setPreviewData((prev) => [...prev, preview])
        setHeaderData((prev) => [...prev, header])
}
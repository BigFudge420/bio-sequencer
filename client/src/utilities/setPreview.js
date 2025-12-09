export default async function setPreview(file, setPreviewData, setHeaderData) {
        const text = await file.slice(0, 160).text()
        const lines = text.split('\n')
        const header = lines.find(line => line.startsWith('>')) || 'SEQ_01'
        const preview = lines.filter(line => !line.startsWith('>')).join('')

        setPreviewData(preview)
        setHeaderData(header)
}
import  showError  from './showError'

export default function validateFile(file, allowedExtensions, maxBytes) {
    const ext = file.name.split('.').pop().toLowerCase()

        if (!allowedExtensions.includes(`.${ext}`)){
            showError(422)
        }

        if (file.size > maxBytes) {
            showError(413)  
        }
}
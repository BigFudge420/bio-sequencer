export default function showError(code) {
    const ERROR_MESSAGES = {
        400: 'Bad Request: The server could not understand the request due to invalid syntax.',
        413: 'Payload Too Large: The uploaded file exceeds the server\'s size limit.',
        422: 'Unprocessable Entity: The server understands the content type of the request entity, but was unable to process the contained instructions.',
        500: 'Internal Server Error: The server has encountered a situation it doesn\'t know how to handle.'
    }

    const message = ERROR_MESSAGES[code] || 'An unknown error occurred.'
    console.error(`Error ${code}: ${message}`)

    return message
}
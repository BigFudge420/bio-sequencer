from fastapi import UploadFile, HTTPException # type: ignore

def stream_file(file: UploadFile, max_bytes: int) -> str:
    total = 0
    buffer = []

    while chunk := file.read(64000):
        total += len(chunk)
        if total > max_bytes:
            raise HTTPException(status_code=413, detail="File too large.")
        buffer.append(chunk)

    bytes = b''.join(buffer)

    try:
        text = bytes.decode('utf-8', errors='strict')
    except UnicodeDecodeError:
        try:
            text = bytes.decode('latin-1', errors='strict')
        except UnicodeDecodeError:
            raise HTTPException(status_code=400, detail="Unsupported file encoding. Use UTF-8 or Latin-1.")
        
    return text
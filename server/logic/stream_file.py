from fastapi import UploadFile, HTTPException # type: ignore
from typing import Optional
import logging

async def stream_file(file: UploadFile, max_bytes: int, logger: Optional[logging.Logger] = None) -> str:
    logger = logger or logging.getLogger("bioseq_logger")
    logger.info(f"Starting to stream file: {file.filename} with max size {max_bytes} bytes.")

    total = 0
    buffer = []

    while chunk := await file.read(64000):
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

    if logger:
        logger.info(f"File streamed successfully. Length of text: {len(text)} characters.")    
      
    return text
from fastapi import UploadFile, HTTPException # type: ignore
from typing import Optional
from Bio import SeqIO  # type: ignore
from io import StringIO
import logging

async def stream_and_parse_file(file: UploadFile, logger: Optional[logging.Logger] = None) -> SeqIO.SeqRecord:
    logger = logger or logging.getLogger("bioseq_logger")
    logger.info(f"Starting to stream file: {file.filename} with size {file.size} bytes.")

    total = 0
    buffer = []

    while chunk := await file.read(64000):
        total += len(chunk)
        buffer.append(chunk)

    bytes = b''.join(buffer)
    logger.info(f"Finished reading file: {file.filename}. Total bytes read: {total}.")

    logger.info("Attempting to decode file content.")
    try:
        text = bytes.decode('utf-8', errors='strict')
    except UnicodeDecodeError:
        try:
            text = bytes.decode('latin-1', errors='strict')
        except UnicodeDecodeError:
            logger.error("Unsupported file encoding. Use UTF-8 or Latin-1.")
            raise HTTPException(status_code=400, detail="Unsupported file encoding. Use UTF-8 or Latin-1.")

    logger.info("File decoded successfully. Attempting to parse as FASTA.")
    text_io = StringIO(text)
    try:
        records = list(SeqIO.parse(text_io,  'fasta'))
        if records:
            logger.info(f"File streamed and parsed successfully as FASTA with {len(records)} records.")
            return records[0] # Return the first record for simplicity
    except Exception as e:
        logger.warning(f"Failed to parse as FASTA: {e}")

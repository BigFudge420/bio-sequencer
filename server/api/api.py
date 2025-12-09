from fastapi import FastAPI, HTTPException, File, UploadFile, Form  # type: ignore
from fastapi.middleware.cors import CORSMiddleware  # type: ignore
from typing import Optional
from bio_utils.bio_seq import BioSeq
from bio_utils.bio_structs import SEQ_TYPES
import logging

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_methods=['*'],
    allow_headers=['*']
)

logger = logging.getLogger("bioseq_logger")

@app.post('/analyse')
def analyze(
    file : UploadFile = File(...),
    seq_type: str = Form('DNA') 
    ) -> dict:

    if seq_type not in SEQ_TYPES:
        raise HTTPException(status_code=400, detail=f"Invalid seq_type. Must be one of {SEQ_TYPES}")
    
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded.")

    logger.info(f"Received file: {file.filename} for analysis as {seq_type}")


    return {
        "message": "This is a placeholder response from the /analyse endpoint."
    }   





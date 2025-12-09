from fastapi import FastAPI, HTTPException, File, UploadFile, Form  # type: ignore
from fastapi.middleware.cors import CORSMiddleware  # type: ignore
from typing import Optional
from bio_utils.bio_seq import BioSeq
from bio_utils.bio_structs import SEQ_TYPES
from logic.stream_file import stream_file
from logic.parse_text import parse_text
import logging

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*']
)

logger = logging.getLogger("bioseq_logger")

@app.post('/analyse')
async def analyze(
    file : UploadFile = File(...),
    seq_type: str = Form('DNA') 
    ) -> dict:

    if seq_type not in SEQ_TYPES:
        logger.error(f"Invalid seq_type provided: {seq_type}")
        raise HTTPException(status_code=400, detail=f"Invalid seq_type. Must be one of {SEQ_TYPES}")
    
    if not file.filename:
        logger.error("No file uploaded.")
        raise HTTPException(status_code=400, detail="No file uploaded.")

    logger.info(f"Received file: {file.filename} for analysis as {seq_type}")

    MAX_BYTES = 5000000 
    
    text = await stream_file(file, MAX_BYTES)

    parsed = parse_text(text, logger)

    warnings = []
    if seq_type == 'DNA' and 'U' in parsed['sequence']:
        parsed['sequence'] = parsed['sequence'].replace('U', 'T')
        warnings.append("Warning: Uracil (U) found in DNA sequence - converted to Thymine (T).")

    logger.info('Creating BioSeq object')
    bioseq_obj = BioSeq(seq=parsed['sequence'], label=parsed['header'], seq_type=seq_type)

    result = bioseq_obj.analyze_seq()
    result['warnings'] = warnings

    return {
        'ok' : True,
        'count' : 1,
        'result' : {
            'header': parsed['header'],
            'sequence': result['sequence'],
            'orfs': result['orfs'],
            'warnings': result['warnings']
        }
    }





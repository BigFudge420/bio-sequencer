from fastapi import FastAPI, HTTPException, File, UploadFile, Form  # type: ignore
from fastapi.middleware.cors import CORSMiddleware  # type: ignore
from typing import Optional
from bio_utils.bio_seq import BioSeq
from bio_utils.bio_structs import SEQ_TYPES
from logic.stream_and_parse_file import stream_and_parse_file
from logic.sanitize import sanitize
from Bio import SeqIO  # type: ignore
import logging

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*']
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s"
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

    MAX_BYTES = 5000000

    if file.size and file.size > MAX_BYTES:
        logger.error(f"Uploaded file size {file.size} exceeds maximum limit of {MAX_BYTES} bytes.")
        raise HTTPException(status_code=413, detail="File too large.")

    logger.info(f"Received file: {file.filename} for analysis as {seq_type}") 

    record = await stream_and_parse_file(file, logger=logger)
    parsed = {'sequence': str(record['seq']).upper(), 'header': sanitize(record['id'], logger=logger)}

    logger.info('Checking for warnings in sequence')
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





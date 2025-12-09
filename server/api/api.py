from fastapi import FastAPI, HTTPException, File, UploadFile, Form  # type: ignore
from fastapi.middleware.cors import CORSMiddleware  # type: ignore
from logic.bio_seq import BioSeq

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_methods=['*'],
    allow_headers=['*']
)

@app.post('/analyse')
def analyze(
    file : UploadFile = File(...),
    seq_type: str = Form('DNA') 
    ) -> dict:

    print(f"Received file: {file.filename} of type {seq_type}")

    return {
        "message": "This is a placeholder response from the /analyse endpoint."
    }   





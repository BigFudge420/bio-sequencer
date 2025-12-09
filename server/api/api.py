from fastapi import FastAPI # type: ignore
from fastapi.middleware.cors import CORSMiddleware  # type: ignore
from pydantic import BaseModel # type: ignore
from logic.bio_seq import BioSeq

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_methods=['*'],
    allow_headers=['*']
)

class AnalysisReq(BaseModel):
    seq : str
    seq_type : str
    label : str

@app.post('/analyse')
def analyze(req : AnalysisReq) -> dict:
    obj = BioSeq(seq=req.seq, label=req.label, seq_type=req.seq_type)
    
    return obj.analyze_seq()





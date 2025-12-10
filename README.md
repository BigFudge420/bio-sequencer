# **Ribosome**

# Backend

## Upload policy
UPLOAD_POLICY = single-FASTA

We accept exactly one FASTA record per uploaded file. If more than one record is detected the API returns HTTP 400 with message:
"Multiple FASTA records detected — please upload a single-record FASTA."

Non-FASTA files will be converted to FASTA format


## Labelling rules
Header sanitization:
- Use FASTA header if present, else "SEQUENCE_1".
- Trim to 100 chars; replace non-alphanum (except . _ -) with '_'.

## Error and warning policy:
- Multiple FASTA records -> Only the first one is used"
- Invalid characters for expected seq_type or seq -> 400 with details of offending chars.
- File too large -> 413 Payload Too Large.
- U->T conversion (RNA to DNA) -> auto-convert + return warnings array in response.

## Files are not persisted; analysis is transient.

## Respones type

``` json
{
  "ok": true,
  "count": 1,
  "result": {
    "header": "MY_SEQ",
    "sequence": ...,
    "orfs": ...,
    "warnings": [],
  }
}
```
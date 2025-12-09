from logic.sanitize import sanitize
from typing import Optional
import logging

def parse_text(text: str, logger: Optional[logging.Logger] = None) -> dict:
    logger = logger or logging.getLogger("bioseq_logger")
    logger.info("Starting to parse text input.")
    
    lines = text.splitlines()
    
    header = lines.pop(0) if lines and lines[0].startswith('>') else '' 

    sanitized_header = sanitize(header, logger)

    sequence = ''.join(lines).replace(' ', '').replace('\t', '').upper()

    if logger:
        logger.info(f'Parsed header: {sanitized_header}')
        logger.info(f'Sequence length: {len(sequence)}')

    return {
        'header' : sanitized_header,
        'sequence' : sequence
    }
    

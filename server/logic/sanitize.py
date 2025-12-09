import re
import logging
from typing import Optional

def sanitize(header: Optional[str], logger : Optional[logging.Logger],fallback : str = 'SEQ_01', maxlen : int = 100) -> str:
    logger = logger or logging.getLogger("bioseq_logger")
    logger.info("Starting header sanitization.")
    
    if not header:
        return fallback
    
    s = header.lstrip('> \t')
    s = re.sub(r'\s+', '_', s)
    s = re.sub(r'[^A-Za-z0-9_.-]', '_', s)
    s = re.sub(r'_+', '_', s)
    s = s[0:maxlen]
    s = s.strip('_.-')
    
    if not s:
        return fallback
    
    if logger:
        logger.info(f'Raw header: {header}')
        logger.info(f'Sanitized header to: {s}')

    return s
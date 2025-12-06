from dataclasses import dataclass, field
from logic.bio_structs import *

@dataclass
class ORF:
    protein : str
    label : str
    frame_label : str
    start : int
    end : int
    is_valid : bool = field(init=False)

    def __post_init__(self):
        self.protein = self.protein.upper()

        self.is_valid = self.validate()

    def __len__(self) -> int:
        return len(self.protein)

    def validate(self) -> bool:
        return set(ELEMENTS['AA']).issuperset(self.protein)

    def to_dict(self) -> dict:
        return {
            "label": self.label,
            "protein": self.protein,
            "start": self.start,
            "end": self.end,
            "length" : self.protein,
            "frame" : getattr(self, "frame_label", None),
            "is_valid" : self.is_valid
        }
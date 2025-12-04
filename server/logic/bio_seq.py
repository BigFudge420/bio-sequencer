from dataclasses import dataclass, field
from bio_structs import *
from random import choice
from collections import Counter
from orf import ORF

@dataclass
class BioSeq:
    seq: str = 'ATCG'
    label: str = 'No label'
    seq_type: str = 'DNA'
    is_valid: bool = field(init=False)

    def __post_init__(self) -> None:
        self.seq = self.seq.upper()
        self.seq_type = self.seq_type.upper()

        if self.seq_type not in ('DNA', 'RNA', 'AA'):
            raise ValueError(f'{self.seq_type} is not a valid sequence')

        self.is_valid = self.validate()
        assert self.is_valid, f'Given sequence is not a valid {self.seq_type} sequence.'

    def __len__(self) -> int:
        return len(self.seq)

    def validate(self) -> bool:
        return set(ELEMENTS[self.seq_type]).issuperset(self.seq)

    def get_seq_type(self) -> str:
        return self.seq_type

    def get_seq_info(self) -> str:
        return f'Label: {self.label} \nBiotype: {self.seq_type} \nSeq: {self.seq} \nValid: {self.is_valid} \nLength: {len(self.seq)}'

    @classmethod
    def get_rnd_seq(cls, length :int = 10, seq_type: str = 'DNA') -> 'BioSeq':
        seq = ''.join([choice(ELEMENTS[seq_type]) for _ in range(length)])
        return cls(seq=seq, seq_type=seq_type)

    def nuc_freq(self) -> dict[str, int] :
        return dict(Counter(self.seq))

    def transcribe(self) -> 'BioSeq':
        return BioSeq(seq= self.seq.replace('T','U'), label= self.label + '_RNA', seq_type= 'RNA')

    def rev_complement(self) -> 'BioSeq':
        default_map = str.maketrans('', '')

        if self.seq_type == 'DNA':
            mapping = str.maketrans('ATCG', 'TAGC')
        elif self.seq_type == 'RNA':
            mapping = str.maketrans('AUCG', 'UAGC')
        else:
            mapping = default_map

        revc_seq = self.seq.translate(mapping)[::-1]

        return BioSeq(seq = revc_seq, label = self.label + '_REVC', seq_type = self.seq_type)

    def gc_content(self, start : int = 0, stop : int = 0) -> float:
        if stop > start:
            seq = self.seq[start : stop]
        else:
            seq = self.seq

        length = len(seq)
        if length == 0:
            raise ValueError('Sequence is empty')

        gc = seq.count('G') + seq.count('C')
        return gc / length * 100

    def gc_content_sub(self, k : int = 20) -> list[float]:
        if k <= 0:
            raise ValueError('k must be greater than 0')

        return [
            self.gc_content(start=i, stop=i+k)
            for i in range(0, len(self.seq) - k + 1, k)
        ]

    def translate(self, init_pos : int = 0) -> 'BioSeq':
        if self.seq_type == 'DNA':
            prot_seq = ''.join([DNA_Codons.get(self.seq[i : i + 3], '?')
                            for i in range(init_pos, len(self.seq) - 2, 3)
                            if len(self.seq[i : i + 3]) == 3]
                           )
        elif self.seq_type == 'RNA':
            prot_seq = ''.join([RNA_Codons.get(self.seq[i: i + 3], '?')
                            for i in range(init_pos, len(self.seq) - 2, 3)
                            if len(self.seq[i: i + 3]) == 3]
                           )
        else:
            raise ValueError(f'Sequence must be a valid DNA or RNA sequence')

        return BioSeq(seq = prot_seq, label = self.label + '_aa_seq', seq_type = 'AA')

    def codon_usage(self, aa = 'L') -> dict[str, float]:
        if self.seq_type == 'DNA':
            codons = [self.seq[i : i + 3]
                      for i in range(0, len(self.seq) - 2, 3)
                      if DNA_Codons.get(self.seq[i : i + 3]) == aa
                      ]
        elif self.seq_type == 'RNA':
            codons = [self.seq[i : i + 3]
                      for i in range(0, len(self.seq) - 2, 3)
                      if RNA_Codons.get(self.seq[i : i + 3]) == aa
                      ]

        else:
            raise ValueError(f'Sequence must be a valid DNA or RNA sequence')

        counts = dict(Counter(codons))
        total = sum(counts.values())
        if total == 0:
            return {}
        return {codon: count/total for codon, count in  counts.items()}

    def get_reading_frames(self) -> list[tuple[str, 'BioSeq']]:
        f0 = ('+1', self.translate(init_pos=0))
        f1 = ('+2', self.translate(init_pos=1))
        f2 = ('+3', self.translate(init_pos=2))

        rev = self.rev_complement()
        r0 = ('-1' , rev.translate(init_pos=0))
        r1 = ('-2', rev.translate(init_pos=1))
        r2 = ('-3', rev.translate(init_pos=2))

        return [f0, f1, f2, r0, r1, r2]

    def proteins_from_rf(self, aa_seq : str, frame_label : str) -> list['ORF']:
        orfs = []
        currents = []
        orf_id = 1

        for i, aa in enumerate(aa_seq):
            for c in currents:
                c['chars'].append(aa)

            if aa == 'M':
                currents.append({'start': i, 'chars': ['M']})

            if aa == '_' and currents:
                for c in currents:
                    protein = ''.join(c['chars'])
                    orfs.append(ORF(
                        protein = protein,
                        label = self.label + f'_({frame_label})_ORF_{orf_id}',
                        frame_label = frame_label,
                        start = c['start'],
                        end = i,
                    ))
                    orf_id += 1
                currents = []

        return orfs

    def all_prots_from_orfs(self, start: int = 0, end: int = 0, ordered : bool = False) -> list:
        if end > start:
            temp_seq = BioSeq(seq = self.seq[start:end], seq_type = self.seq_type)
            rfs = temp_seq.get_reading_frames()
        else:
            rfs = self.get_reading_frames()

        res = []

        for frame_label , rf in rfs:
            prots = self.proteins_from_rf(aa_seq = rf.seq, frame_label = frame_label)
            res.extend(prots)

        if ordered:
            return sorted(res, key = len, reverse = True)
        return res

    def to_dict(self) -> dict:
        return {
            'label': self.label,
            'seq_type': self.seq_type,
            'seq': self.seq,
            'length' : len(self.seq),
            'is_valid' : self.is_valid,
            'gc_content' : (
                self.gc_content()
                if self.seq_type in ('DNA', 'RNA')
                else None
            ),
            'nucleotide_count' : (
                self.nuc_freq()
                if self.seq_type in ('DNA', 'RNA')
                else None
            )
        }
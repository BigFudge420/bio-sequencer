import Dna from "../svgs/Dna"

export default function Header() {
    return (
        <div className="flex flex-col items-center gap-[1rem] p-[1rem] m-[1rem] min-w-[25rem] w-[40rem]">
            <Dna className="shadow-[2px_2px_35px_8px_rgba(30,200,255,0.4)] rounded-xl" />
            <strong className="text-xl text-[#005cff]">Ribosome: Next-Gen Sequencer</strong>
            <p className="text-2xl text-[#90A1B9]">Advanced genomic sequence processing platform</p>
        </div>
    )
}
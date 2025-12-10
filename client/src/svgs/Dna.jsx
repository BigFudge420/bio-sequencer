export default function Dna({className = ''}) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="90" 
            height="90" 
            viewBox="0 0 30 30"
            className={className}
        >
            <defs>
                <linearGradient id='blueGradient' x1='0%' y1 ='0%' x2='100%' y2='100%'>
                    <stop offset='0%' stopColor="#1EC8FF"/>
                    <stop offset='100%' stopColor="#0063FF"/>
                </linearGradient>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <rect width='100%' height='100%' rx='4' fill="url(#blueGradient)"/>
            <g 
                transform="translate(3,3)"
                stroke="black"
                strokeWidth='2'
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            >
                <path d="m10 16 1.5 1.5"/>
                <path d="m14 8-1.5-1.5"/>
                <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/>
                <path d="m16.5 10.5 1 1"/>
                <path d="m17 6-2.891-2.891"/>
                <path d="M2 15c6.667-6 13.333 0 20-6"/>
                <path d="m20 9 .891.891"/>
                <path d="M3.109 14.109 4 15"/>
                <path d="m6.5 12.5 1 1"/>
                <path d="m7 18 2.891 2.891"/>
                <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/>
            </g>
            <g 
                transform="translate(3,3)"
                stroke="white"
                strokeWidth='1.8'
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#glow)"
            >
                <path d="m10 16 1.5 1.5"/>
                <path d="m14 8-1.5-1.5"/>
                <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/>
                <path d="m16.5 10.5 1 1"/>
                <path d="m17 6-2.891-2.891"/>
                <path d="M2 15c6.667-6 13.333 0 20-6"/>
                <path d="m20 9 .891.891"/>
                <path d="M3.109 14.109 4 15"/>
                <path d="m6.5 12.5 1 1"/>
                <path d="m7 18 2.891 2.891"/>
                <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/>
            </g>
        </svg>
    )
}
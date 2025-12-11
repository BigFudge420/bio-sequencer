export default function Upload({className}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 40 40" className={className}>
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
                transform="translate(8,7.5)"
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                filter="url(#glow)"
            >
                <path d="M12 3v12"/>
                <path d="m17 8-5-5-5 5"/>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            </g>
        </svg>
    )
}
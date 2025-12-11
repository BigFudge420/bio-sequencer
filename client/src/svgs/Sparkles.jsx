export default function Sparkles({className}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 40 40" className={className}>
            <defs>
                <linearGradient id='blueGradient' x1='0%' y1 ='0%' x2='100%' y2='100%'>
                    <stop offset='0%' stopColor="#1EC8FF"/>
                    <stop offset='100%' stopColor="#8E24AA"/>
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
                <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 
                1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/>
                <path d="M20 2v4"/><path d="M22 4h-4"/>
                <circle cx="4" cy="20" r="2"/>
            </g>
        </svg>
    )
}
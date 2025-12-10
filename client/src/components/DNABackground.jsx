import React, {useRef, useEffect} from "react"

export default function DNABackground({
    isActive = false,
    particleCount = 80,
    maxConnectDist = 150,
    colors = {
      bg: 'rgba(2,6,23, 1)',
      particle: 'rgba(56,189,248,',
      letter: 'rgba(94,234,212,',
      line: 'rgba(56,189,248,',
    }
}) {
    const canvasRef = useRef(null) 
    const particleRef = useRef([])
    const animRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const setCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1
            canvas.style.width = `${window.innerWidth}px`
            canvas.style.height = `${window.innerHeight}px`
            canvas.width = window.innerWidth * dpr
            canvas.height = window.innerHeight * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }

        setCanvasSize()

        const initParticles  = (count) => {
            const arr = []
            for(let i = 0; i < count; i++) {
                arr.push({
                    x : Math.random() * window.innerWidth,
                    y : Math.random() * window.innerHeight,
                    vx : (Math.random() - 0.5) * 0.5,
                    vy : (Math.random() - 0.5) * 0.5,
                    size : Math.random() * 3 + 1,
                    opacity : Math.random() * 0.3 + 0.2,
                })
            }
            return arr
        }

        particleRef.current = initParticles(particleCount)

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            
            ctx.fillStyle = colors.bg
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

            const particles = particleRef.current

            for (let i = 0; i < particles.length; i++){
                
                const p = particles[i]

                p.x += p.vx
                p.y += p.vy

                if(p.x < 0) {p.x = 0, p.vx = -1}
                else if (p.x > window.innerWidth) { p.x = window.innerWidth; p.vx *= -1; }
                if (p.y < 0) { p.y = 0; p.vy *= -1; }
                else if (p.y > window.innerHeight) { p.y = window.innerHeight; p.vy *= -1; }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `${colors.particle}${p.opacity})`;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j];
                const dx = p.x - q.x;
                const dy = p.y - q.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                        
                    if (dist < maxConnectDist) {
                    const lineOpacity = (1 - dist / maxConnectDist) * 0.25;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = `${colors.line}${lineOpacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                    
                    }
                }
            }

            animRef.current = requestAnimationFrame(animate)
        }

        animate()

        const handleResize = () => {
            setCanvasSize()
            const W = window.innerWidth
            const H = window.innerHeight
            particleRef.current.forEach((p) => {
              p.x = Math.min(W, p.x)
              p.y = Math.min(H, p.y)
            })
        }

        window.addEventListener('resize', handleResize);
        
        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current)
            window.removeEventListener('resize', handleResize)
        }

    }, [isActive, particleCount, maxConnectDist, colors])

    return (
        <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none -z-10"
        aria-hidden='true'
        />
    )
}
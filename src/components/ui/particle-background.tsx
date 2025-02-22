"use client"

import { RefObject, useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ParticleBackgroundProps {
    className?: string
    children?: React.ReactNode
    particleDensity?: number
    minFadeoutSpeed?: number
    maxFadeoutSpeed?: number
}

interface ParticleProps {
    x: number;
    y: number;
    radius: number;
    opacity: number;
    fadeoutSpeed: number;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
    className,
    particleDensity = 0.00015,
    minFadeoutSpeed = 0.5,
    maxFadeoutSpeed = 0.8
}) => {
    const canvasRef: RefObject<HTMLCanvasElement | null> = useRef<HTMLCanvasElement>(null);
    const [particles, setParticles] = useState<ParticleProps[]>([]);

    const generateParticles = useCallback(
        (width: number, height: number): ParticleProps[] => {
            const area = width * height;
            const numParticles = Math.floor(area * particleDensity);
            return Array.from({ length: numParticles }, () => {
                return {
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 0.2 + 0.5,
                    opacity: Math.random(),
                    fadeoutSpeed: Math.random() * (maxFadeoutSpeed - minFadeoutSpeed) + minFadeoutSpeed,
                };
            });
        }, [particleDensity, minFadeoutSpeed, maxFadeoutSpeed]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const updateParticles = () => {
            if (canvas) {
                const ctx = canvas.getContext("2d");
                if (!ctx) return;

                const { width, height } = canvas.getBoundingClientRect();
                canvas.width = width;
                canvas.height = height;
                setParticles(generateParticles(width, height));
            }
        };

        updateParticles();

        const resizeObserver = new ResizeObserver(updateParticles);
        if (canvas) {
            resizeObserver.observe(canvas);
        }

        return () => {
            if (canvas) {
                resizeObserver.unobserve(canvas);
            }
        };
    }, [generateParticles])

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                ctx.fill();

                particle.opacity -= particle.fadeoutSpeed / 100;
                particle.y -= 0.15;

                if (particle.opacity <= 0) {
                    particle.opacity = Math.random() * 0.5 + 0.5;
                    particle.x = Math.random() * canvas.width;
                    particle.y = Math.random() * canvas.height;
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [particles]);

    return (
        <canvas ref={canvasRef} className={cn("w-full h-full absolute inset-0 -z-10 opacity-70", className)}></canvas>
    )
}
"use client"

import { motion, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimateLineCardProps {
    className?: string
    children?: React.ReactNode
    lineSize?: 'sm' | 'lg'
}
export const AnimateLineCard: React.FC<AnimateLineCardProps> = ({
    className,
    children,
    lineSize = 'sm'
}) => {
    const lineWidth = lineSize === 'sm' ? '1px' : '2px'

    const card: Variants = {
        hidden: { opacity: 0, '--angle': '0deg' },
        visible: { opacity: 1 },
        line: { '--angle': ['0deg', '360deg'], transition: { duration: 10, repeat: Infinity, ease: 'linear' } }
    }

    return (
        <motion.div
            variants={card}
            initial="hidden"
            animate={["visible", "line"]}
            className={cn("relative", className)}>
            <div
                className='[--border-color:theme(colors.theme.20)] [--line-color:theme(colors.theme.60)] w-full h-full absolute inset-0 bg-[conic-gradient(from_var(--angle),transparent,var(--line-color),transparent_120deg)] bg-[color:var(--border-color)] [mask:linear-gradient(#fff_0_100%)padding-box_exclude,linear-gradient(#fff_0_100%)content-box] rounded-[inherit] -z-10'
                style={{ padding: lineWidth }}>
            </div>
            {children}
        </motion.div>
    )
}
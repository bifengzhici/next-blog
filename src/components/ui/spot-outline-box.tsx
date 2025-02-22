"use client"

import { cn } from '@/lib/utils';
import { motion, MotionProps, Variants } from 'framer-motion';

interface SpotOutlineBoxProps {
    className?: string;
    children: React.ReactNode;
}
export const SpotOutlineBox: React.FC<SpotOutlineBoxProps & MotionProps> = ({
    className,
    children,
    ...motionProps
}) => {
    const variants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1 } }
    }

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            {...motionProps}
            className={cn('[--dot-size:4px] [--dot-color:theme(colors.theme.base)] relative', className)}>
            {/* dot */}
            <div className='absolute z-10 inset-[calc(var(--dot-size)*-.5)] bg-no-repeat bg-[position:0_0,100%_0,0_100%,100%_100%] bg-[image:radial-gradient(var(--dot-color)_50%,transparent_50%),radial-gradient(var(--dot-color)_50%,transparent_50%),radial-gradient(var(--dot-color)_50%,transparent_50%),radial-gradient(var(--dot-color)_50%,transparent_50%)] bg-[size:var(--dot-size)_var(--dot-size),var(--dot-size)_var(--dot-size),var(--dot-size)_var(--dot-size),var(--dot-size)_var(--dot-size)]'></div>
            <div className='w-full h-full absolute z-20'>{children}</div>
        </motion.div>
    );
};
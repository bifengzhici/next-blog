"use client"

import { useScroll, useTransform, Variants, motion } from "framer-motion";
import Link from "next/link";
import { AnimateLineCard } from "@/components/ui/animate-line-card";
import { GradientText } from "@/components/ui/gradient-text";
import { ColorPicker } from "@/components/ui/color-picker";
import { useThemeColor } from "@/hooks/useThemeColor";

export const Header = () => {
    const { scrollYProgress } = useScroll();
    const blurValue = useTransform(
        scrollYProgress,
        [0, 1],
        ["blur(0px)", "blur(4px)"]
    );

    const { themeColor, setThemeColor } = useThemeColor()

    const header: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 2 } }
    }

    const handleChange = (newColor: string) => {
        setThemeColor(newColor)
    }

    return (
        <motion.header className="w-full fixed top-0 z-40" variants={header} initial="hidden" animate="visible" style={{ backdropFilter: blurValue, WebkitBackdropFilter: blurValue }}>
            <div className="h-[70px] sm:h-[85px] container mx-auto px-4 flex justify-between items-center">
                <Link href="http://bifengzhici.cn" target="_blank" className="text-theme-80 select-none opacity-70 text-lg md:text-xl lg:text-2xl font-bold hover:opacity-100 transition-opacity duration-300">BFZC</Link>
                <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                    <ColorPicker
                        color={themeColor}
                        onChange={handleChange}
                    />
                    <AnimateLineCard className="w-24 md:w-28 lg:w-32 aspect-[14/5] rounded-full">
                        <Link href='https://github.com/bifengzhici' target="_blank" className="w-full h-full flex rounded-[inherit]">
                            <GradientText className="m-auto text-base md:text-lg lg:text-xl" text="Github" />
                        </Link>
                    </AnimateLineCard>
                </div>
            </div>
        </motion.header>
    )
}
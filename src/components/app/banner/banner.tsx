"use client"

import { cn } from "@/lib/utils"
import styles from './banner.module.css'
import { motion, Variants } from 'framer-motion'
import { ParticleBackground } from "@/components/ui/particle-background";
import { GradientText } from "@/components/ui/gradient-text"
import { SpotOutlineBox } from "@/components/ui/spot-outline-box"

interface BannerProps {
    className?: string
}

export const Banner: React.FC<BannerProps> = ({
    className
}) => {
    return (
        <div className={cn("w-full relative before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(50%_64.48%_at_50%_35.52%,theme(colors.theme.3)_14.36%,transparent_100%),radial-gradient(50%_67.94%_at_50%_32.06%,theme(colors.theme.2)_0,theme(colors.theme.1)_50%,transparent_100%)]", styles.bannerGrid, className)}>
            <ParticleBackground />
            <Lines />
            <SpotLight />
            <Introducing />
            <Logo />
            <Headline />
            <Mountains />
        </div>
    )
}

const Lines = () => {
    const line: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1, delay: 0.5 } }
    }
    const cross: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, rotate: 720, transition: { duration: 1, delay: 0.5 } }
    }

    return (
        <>
            <motion.div variants={line} initial="hidden" animate="visible" className="absolute inset-0 grid-rows-[inherit] grid-cols-[inherit] [place-content:inherit] z-10">
                {/* 横线 */}
                <div className={cn("w-full h-full absolute inset-0", styles.hLineGrid)}>
                    <div className="[grid-area:h-line-1] h-[1px] w-full bg-gradient-to-r from-transparent via-theme-20 to-transparent opacity-75"></div>
                    <div className="[grid-area:h-line-2] h-[1px] w-full bg-gradient-to-r from-transparent via-theme-20 to-transparent opacity-100"></div>
                    <div className="[grid-area:h-line-3] h-[1px] w-full bg-gradient-to-r from-transparent via-theme-20 to-transparent opacity-100"></div>
                    <div className="[grid-area:h-line-4] h-[1px] w-full bg-gradient-to-r from-transparent via-theme-20 to-transparent opacity-100"></div>
                    <div className="[grid-area:h-line-5] h-[1px] w-full bg-gradient-to-r from-transparent via-theme-20 to-transparent opacity-100"></div>
                    <div className="[grid-area:h-line-6] h-[1px] w-full bg-gradient-to-r from-transparent via-theme-20 to-transparent opacity-100"></div>
                </div>
                {/* 竖线 */}
                <div className={cn("w-full h-full absolute inset-0", styles.vLineGrid)}>
                    <div className="[grid-area:v-line-1] w-full min-h-screen bg-gradient-to-b from-theme-20 to-transparent"></div>
                    <div className="[grid-area:v-line-2] w-full min-h-screen bg-gradient-to-b from-theme-20 to-transparent"></div>
                    <div className="[grid-area:v-line-3] w-full min-h-screen bg-gradient-to-b from-theme-20 to-transparent"></div>
                    <div className="[grid-area:v-line-4] w-full min-h-screen bg-gradient-to-b from-theme-20 to-transparent"></div>
                </div>
            </motion.div>
            {/* 交叉线 */}
            <motion.div variants={cross} initial="hidden" animate="visible" className="[grid-area:cross-1] hidden sm:block w-[40px] aspect-square bg-[linear-gradient(45deg,transparent_50%,theme(colors.theme.20)_50%,transparent_calc(50%_+_1px)),linear-gradient(-45deg,transparent_50%,theme(colors.theme.20)_50%,transparent_calc(50%_+_1px))]"></motion.div>
            <motion.div variants={cross} initial="hidden" animate="visible" className="[grid-area:cross-2] hidden sm:block w-[40px] aspect-square bg-[linear-gradient(45deg,transparent_50%,theme(colors.theme.20)_50%,transparent_calc(50%_+_1px)),linear-gradient(-45deg,transparent_50%,theme(colors.theme.20)_50%,transparent_calc(50%_+_1px))]"></motion.div>
        </>
    )
}

const SpotLight = () => {
    const spot: Variants = {
        hidden: { opacity: 0, y: -50, translateX: '-50%' },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 1, ease: 'easeOut' } }
    }
    const spotLight: Variants = {
        hidden: ({ rotate }) => ({ height: 0, originX: 0.5, originY: 0, translateX: '-50%', rotate }),
        visible: ({ index }) => ({
            height: '100%', rotateZ: [0, -2, 4, -4, 2, 0], transition: {
                height: { duration: 1, delay: 1.5, ease: 'easeOut' },
                rotateZ: { duration: 17 - 3 * index, repeat: Infinity }
            }
        })
    }

    return (
        <div className="absolute inset-0 z-20 [mask-image:radial-gradient(farthest-side_at_50%_0,red_60%,transparent_90%)]">
            <motion.div variants={spot} initial="hidden" animate="visible" className="w-8 sm:w-9 md:w-10 aspect-square rounded-full absolute left-1/2 top-[30px] bg-black shadow-[0_0_16px_0_theme(colors.theme.60)]"></motion.div>
            {
                [20, 0, -20].map((rotate, index) => {
                    return (
                        <motion.div variants={spotLight} initial="hidden" animate="visible" key={rotate} custom={{ rotate, index }} className="w-[200px] h-[700px] rounded-full opacity-50 blur-[12px] absolute left-1/2 top-[30px] bg-[conic-gradient(from_0deg_at_50%_-5%,transparent_45%,theme(colors.theme.20)_49%,theme(colors.theme.30)_50%,theme(colors.theme.20)_51%,transparent_55%)]"></motion.div>
                    )
                })
            }
        </div>
    )
}

const Introducing = () => {
    const introducing: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { delay: 0.5, duration: 2 } }
    }

    return (
        <motion.div variants={introducing} initial="hidden" animate="visible" className="relative [grid-area:introducing] flex justify-center items-center gap-[24px] z-30">
            <div className="w-[86px] h-[1px] bg-gradient-to-r from-transparent to-theme-60"></div>
            <div className="font-normal text-[14px] whitespace-nowrap text-nowrap shrink-0">
                <GradientText text="Introducing" />
            </div>
            <div className="w-[86px] h-[1px] bg-gradient-to-r from-transparent to-theme-60 rotate-180"></div>
        </motion.div>
    )
}

const Logo = () => {
    const headline: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 2, delay: 0.5 } },
        shine: {
            '--p': ['0%', '300%', '300%'],
            transition: {
                duration: 7,
                delay: 2.5,
                repeat: Infinity,
                times: [0, 0.8, 1]
            }
        }
    }

    return (
        <SpotOutlineBox className="w-full h-full relative [grid-area:logo] z-30">
            <motion.div variants={headline} initial="hidden" animate={["visible", "shine"]} className="w-full h-full relative text-[50px] sm:text-[64px] md:text-[72px] lg:text-[80px] xl:text-[88px] 2xl:text-[96px] font-semibold">
                <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(2em_2em_at_50%_50%,transparent_calc(var(--p)_-_2em),#fff_calc(var(--p)_-_1em),#fff_calc(var(--p)_-_0.4em),transparent_var(--p)),linear-gradient(0deg,theme(colors.theme.base),theme(colors.theme.80))] text-transparent bg-clip-text whitespace-nowrap text-nowrap">笔锋至此</h1>
                <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none opacity-50 blur-[12px] bg-[radial-gradient(2em_2em_at_50%_50%,transparent_calc(var(--p)_-_2em),transparent_calc(var(--p)_-_1em),#fff_calc(var(--p)_-_1em),#fff_calc(var(--p)_-_0.4em),transparent_calc(var(--p)_-_0.4em),transparent_var(--p))] text-transparent bg-clip-text whitespace-nowrap text-nowrap">笔锋至此</h1>
            </motion.div>
        </SpotOutlineBox>
    )
}

const Headline = () => {
    const headline: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 2, delay: 0.5 } }
    }

    return (
        <SpotOutlineBox className="relative [grid-area:headline] w-full h-full mt-[-1.5px] z-30">
            <motion.h2 variants={headline} initial="hidden" animate="visible" className="w-full h-full p-[6px] flex flex-col justify-center items-center text-base sm:text-lg md:text-xl">
                <GradientText text="这是一个博客" />
                <GradientText text="来自一个不知名路人" />
            </motion.h2>
        </SpotOutlineBox>
    )
}

const Mountains = () => {
    const translate = [['-7.5em', '9.8em'], ['-2em', '3.8em'], ['7.5em', '10.8em']]
    const mountains: Variants = {
        hidden: ({ translate: [translateX, translateY], index }) => ({ opacity: 0, y: 200, width: index === 1 ? '14em' : '20em', translateX, translateY, rotate: '45deg' }),
        visible: ({ index }) => ({ opacity: 1, y: 0, transition: { duration: 2, delay: 1.6 - index * 0.3 } })
    }

    return (
        <motion.div className="relative [grid-area:mountains] w-full h-full text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[13px] [mask-image:linear-gradient(180deg,red,transparent_90%,transparent)] z-30">
            {
                translate.map((translate, index) => {
                    return (
                        <motion.div key={index} variants={mountains} custom={{ translate, index }} initial="hidden" animate="visible" className="h-[20em] absolute left-0 right-0 mx-auto brightness-[0.8] bg-[repeating-radial-gradient(at_100%_100%,transparent_0%,theme(colors.theme.20)_2px,_transparent_4px)] bg-[#05060f] shadow-[-1em_-0.2em_0.4em_-1.1em_#c2ccff,inset_0em_0em_0em_1px_theme(colors.theme.80),inset_0.2em_0.3em_0.2em_-0.2em_theme(colors.theme.base),inset_10.2em_10.3em_2em_-10em_theme(colors.theme.30)]"></motion.div>
                    )
                })
            }
        </motion.div>
    )
}
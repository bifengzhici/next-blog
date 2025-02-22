"use client"

import { motion, Variants } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { CiSearch } from 'react-icons/ci'

export const Search = () => {
    const router = useRouter()

    const handleSubmit = ((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const search = formData.get('search') as string
        router.push(search === '' ? '/' : `/?search=${search}`)
    })

    const search: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 2.5 } }
    }

    return (
        <motion.div variants={search} initial='hidden' whileInView='visible' viewport={{ once: true }} className='w-full h-24 px-4 flex'>
            <form onSubmit={handleSubmit} className='container max-w-[1000px] h-12 sm:h-14 border-[2px] m-auto rounded-full border-theme-80 text-neutral-50 flex justify-center items-center gap-2 pl-4 pr-[4px] sm:pr-[6px]'>
                <input type="text" name='search' className='w-full flex-grow outline-none bg-transparent' />
                <button type='submit' className='w-9 sm:w-10 aspect-square flex-shrink-0 bg-theme-80 rounded-full sm:text-xl flex'>
                    <CiSearch className='m-auto' />
                </button>
            </form>
        </motion.div>
    )
}

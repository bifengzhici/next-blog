"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components//ui/select'
import Link from "next/link";
import { motion, Variants } from "framer-motion"
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types/nav';

interface NavProps {
    list: NavItem[]
}

export const Nav: React.FC<NavProps> = ({
    list
}) => {
    const nav: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 2.5 } }
    }

    return (
        <motion.nav variants={nav} initial="hidden" whileInView='visible' viewport={{ once: true }} className="w-full h-20 px-2 sm:px-4">
            <div className='container h-full mx-auto grid grid-cols-[1fr_auto] gap-2 content-center'>
                <Catrgory list={list} />
                <Sort />
            </div>
        </motion.nav>
    )
}

interface CategoryProps {
    list: NavItem[]
}

const Catrgory: React.FC<CategoryProps> = ({
    list
}) => {
    const query = Object.fromEntries(useSearchParams().entries())

    const { slug } = useParams()
    const allList = [{ name: '' }, ...list]

    function isActive(name: string) {
        const category = slug?.[0] || ''
        return category.toLocaleLowerCase() === name.toLocaleLowerCase()
    }

    return (
        <ul className="h-full flex items-center overflow-auto gap-2 text-neutral-50">
            {
                allList.map((item) => (
                    <li key={item.name}>
                        <Link href={{ pathname: `/${item.name}`, query }}
                            className={cn(
                                'px-2 py-1 rounded-md hover:bg-neutral-50 hover:text-neutral-950 transition-colors',
                                isActive(item.name) && 'bg-neutral-50 text-neutral-950'
                            )}>
                            {item.name === '' ? 'Discover' : item.name}
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}

const Sort = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const sort = searchParams.get('sort') || 'latest'

    const handleValeChange = (value: string) => {
        const params = new URLSearchParams(window.location.search);
        params.set('sort', value);
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <Select onValueChange={handleValeChange} defaultValue={sort}>
            <SelectTrigger className="w-28">
                <SelectValue placeholder="排序" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="hot">最多浏览</SelectItem>
                    <SelectItem value="latest">最新发布</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

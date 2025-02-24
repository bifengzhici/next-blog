import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { IoEyeOutline } from "react-icons/io5";
import { BlogItem } from "@/types/blog";
import { skeleton } from "@/lib/utils";
import Link from "next/link";
import { STRAPI_URL } from "@/lib/request";

interface BlogProps {
    list: BlogItem[]
}

export const Blog: React.FC<BlogProps> = ({
    list
}) => {
    if (!list.length) {
        return (
            <div className="w-full h-[50vh] flex items-center justify-center">
                <p className="text-lg text-neutral-50">未查询到结果</p>
            </div>
        )
    }

    return (
        <div className="w-full pb-40">
            <ul className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2">
                {
                    list.map((item) => (
                        <li key={item.id} className="relative w-full rounded-md overflow-hidden cursor-pointer p-3 border-[2px] border-neutral-800 transition-colors hover:border-theme-60">
                            <Link className="w-full flex flex-col items-start gap-2" href={`/detail/${item.documentId}`}>
                                <div className="w-full aspect-[1.8] relative">
                                    <Image
                                        className="object-cover"
                                        src={`${STRAPI_URL}${item.cover.url}`}
                                        alt={item.title}
                                        fill
                                        placeholder={skeleton}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    {/* <span className="absolute bottom-2 right-2 bg-neutral-900 bg-opacity-50 text-neutral-50 text-sm px-2 py-1 rounded-md flex items-center gap-1">
                                        <IoEyeOutline className="text-lg" />
                                        <span>{item.view}</span>
                                    </span> */}
                                </div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <span className="w-full line-clamp-1 text-lg font-semibold">{item.title}</span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{item.title}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>

    )
}
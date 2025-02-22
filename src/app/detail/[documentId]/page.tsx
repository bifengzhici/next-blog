import { skeleton } from '@/lib/utils'
import Image from 'next/image'
import qs from 'qs'
import Markdown, { Components } from 'react-markdown'
import React from 'react'
import { CodeBlock } from '@/components/ui/code-block'
import { appFetch } from '@/lib/request'
import Link from 'next/link'

export default async function Page({
    params
}: {
    params: Promise<{ documentId: string }>
}) {
    const documentId = (await params).documentId
    const blogDetail = await fetchBlogDetail(documentId)

    const components: Components = {
        a: ({ children, href }) => (
            <Link target='_blank' className='text-lg text-theme-base mx-1' href={href as string}>{children}</Link>
        ),
        h1: ({ children }) => (
            <h1 className='text-lg font-bold sm:text-xl md:text-2xl mt-8'>
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2 className='text-base font-bold sm:text-lg md:text-xl mt-6'>
                {children}
            </h2>
        ),
        p: ({ children }) => (
            <div className='text-sm sm:text-base md:text-lg'>
                {children}
            </div>
        ),
        img: ({ src, alt }) => {
            const unoptimized = src?.endsWith('gif')
            return (
                <div className='relative w-full max-w-[800px] aspect-[1.8] mx-auto my-6'>
                    <Image
                        unoptimized={unoptimized}
                        className="object-cover"
                        src={src as string}
                        alt={alt || ''}
                        fill
                        placeholder={skeleton}
                        sizes="(max-width: 768px) 100vw, 800px"
                    />
                </div>
            )
        },
        code: ({ children }) => {
            const str = React.Children.toArray(children)
                .map(child => {
                    if (typeof child === 'string') {
                        return child;
                    }
                    if (React.isValidElement<{ children?: React.ReactNode }>(child) && child.props.children) {
                        return React.Children.toArray(child.props.children).join('');
                    }
                    return '';
                })
                .join('');

            let filename = '', language = '', code = ''
            const match = str.match(/^\/\/(.+?\.(.+?))\n(.*)/s)
            if (match !== null) {
                filename = match[1]
                language = match[2]
                code = match[3]
            }

            return (
                <div className='my-6'>
                    <CodeBlock code={code} language={language} filename={filename} />
                </div>
            )
        }
    };

    return (
        <div className="py-24">
            <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl my-4 font-bold text-center'>{blogDetail[0].title}</div>
            <Markdown components={components} className='container mx-auto px-4'>{blogDetail[0].blocks[0]?.body}</Markdown>
        </div>
    )
}

async function fetchBlogDetail(documentId: string) {
    const query = qs.stringify({
        filters: {
            documentId: documentId
        },
        populate: 'blocks',
    }, { encodeValuesOnly: true });
    const res = await appFetch(`/articles?${query}`)
    const data = (await res.json()).data
    return data
}

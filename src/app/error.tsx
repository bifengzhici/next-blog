'use client' // Error boundaries must be Client Components

import { NeumorphButton } from '@/components/ui/neumorph-button'
import { useEffect } from 'react'

export default function AppError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='w-full h-screen text-lg flex flex-col justify-center items-center gap-4'>
            <h2>出错了!&nbsp;点击按钮或者刷新页面</h2>
            <NeumorphButton size='large' onClick={() => reset()}>点击重试</NeumorphButton>
        </div>
    )
}
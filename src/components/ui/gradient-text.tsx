import { cn } from '@/lib/utils'

interface GradientTextProps {
    className?: string
    text: string
}
export const GradientText: React.FC<GradientTextProps> = ({
    className,
    text
}) => {
    return (
        <span className={cn('bg-gradient-to-t from-theme-base to-theme-80 text-transparent bg-clip-text', className)}>
            {text}
        </span>
    )
}
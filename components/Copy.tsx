export default function Copy({className, value}: {className?: string, value: string | null | undefined}) {
    return (
        <button className={`w-12 h-8 text-sm rounded-sm bg-std-blue ${className}`} onClick={() => {value && navigator.clipboard.writeText(value)}}>Copy</button>
    )
}
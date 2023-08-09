export default function Copy({className, value}: {className?: string, value: string | null | undefined}) {
    return (
        <button className={`w-12 h-8 text-sm flex items-center place-content-center bg-white dark:bg-std-blue border rounded-sm border-std-blue dark:border-transparent hover:bg-sky-100 dark:hover:bg-std-blue-hover ${className}`} onClick={() => {value && navigator.clipboard.writeText(value)}}>Copy</button>
    )
}
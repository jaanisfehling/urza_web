export default function Copy({className, value}: {className?: string, value: string | null | undefined}) {
    return (
        <svg className={`stroke-black dark:stroke-white h-8 w-8 bg-white dark:bg-std-blue border rounded-sm border-std-blue dark:border-transparent hover:bg-sky-100 dark:hover:bg-std-blue-hover ${className != undefined ? className : ""}`} onClick={() => {value && navigator.clipboard.writeText(value)}} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5.5H6.5V19.5H18.5V5.5H17M12.5 3C11.5 3 11.5 4.5 11 4.5C10 4.5 9.5 5 9.5 6.5H15.6C15.6 5 15 4.5 14 4.5C13.5 4.5 13.5 3 12.5 3Z" strokeWidth="1.5"/></svg>
    )
}
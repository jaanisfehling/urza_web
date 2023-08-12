import Indicator from "./Indicator";

export default function Button({text, className, isLoading, onClick}: {text: string, className?: string, isLoading?: boolean, onClick?: () => void}) {
    if (isLoading) {
        return <Indicator className={`h-8 p-1.5 bg-sky-100 dark:bg-std-blue-hover border rounded-sm border-std-blue dark:border-transparent ${className != undefined ? className : ""}`}/>
    } else {
        return <button onClick={onClick} className={`h-8 p-1.5 flex items-center place-content-center bg-white dark:bg-std-blue border rounded-sm border-std-blue dark:border-transparent hover:bg-sky-100 dark:hover:bg-std-blue-hover ${className != undefined ? className : ""}`}>{text}</button>
    }
}
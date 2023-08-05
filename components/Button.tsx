import Indicator from "./Indicator";

export default function Button({text, className, isLoading, onClick}: {text: string, className?: string, isLoading: boolean, onClick?: () => void}) {
    if (isLoading) {
        return <Indicator className={`p-1.5 m-auto h-10 w-24 rounded-sm bg-std-blue-hover ${className}`}/>
    } else {
        return <button onClick={onClick} className={`p-1.5 m-auto h-10 w-24 rounded-sm bg-std-blue hover:bg-std-blue-hover text-white font-normal ${className}`}>{text}</button>
    }
}
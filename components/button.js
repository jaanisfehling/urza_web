import Indicator from "./Indicator";

export default function Button({text, className, isLoading, onClick}) {
    if (isLoading) {
        return <Indicator className={`${className} rounded-sm bg-std-blue-hover`}/>
    } else {
        return <button onClick={onClick} className={`${className} rounded-sm bg-std-blue hover:bg-std-blue-hover text-white font-normal`}>{text}</button>
    }
}
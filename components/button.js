import Indicator from "./indicator";

export default function Button({text, isLoading, onClick}) {
    if (isLoading) {
        return <Indicator className="p-1.5 m-auto h-10 w-24 rounded-sm bg-std-blue-hover"/>
    } else {
        return <button onClick={onClick} className="m-auto h-10 w-24 rounded-sm bg-std-blue hover:bg-std-blue-hover text-white font-medium text-base">{text}</button>
    }
}
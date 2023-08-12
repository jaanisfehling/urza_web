export default function Indicator({className}: {className: string}) {
    return (
        <div className={`dual-ring-spinner ${className != undefined ? className : ""}`}></div>
    )
}
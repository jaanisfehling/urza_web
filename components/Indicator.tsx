export default function Indicator({className}: {className: string}) {
    return (
        <div className={`lds-dual-ring ${className}`}></div>
    )
}
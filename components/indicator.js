export default function Indicator({className}) {
    return (
        <div className={`lds-ellipsis ${className}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
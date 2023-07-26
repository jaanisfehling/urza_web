export default function Errors({className, errors}: {className?: string, errors: string[]}) {
    return (
        <div className={`flex flex-col space-y-2 p-2 rounded bg-red-300 dark:bg-red-800 ${className}`}
             style={{display: errors.length === 0 ? "none" : ""}}>
            {errors.map(function(msg, i) {
                return <p key={i}>{msg}</p>;
            })}
        </div>
    );
}
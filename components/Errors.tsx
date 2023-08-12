import {useEffect, useState} from "react";

export default function Errors({className, errors, dontShowIf}: {className?: string, errors: string[], dontShowIf?: boolean}) {
    const [display, setDisplay] = useState<string>(errors.length == 0 ? "hidden" : "block");

    useEffect(() => {
        if (dontShowIf && display == "block") {
            setDisplay("opacity-0");
        } else if (errors.length == 0 && display == "block") {
            setDisplay("opacity-0");
            setTimeout(() => setDisplay("hidden"), 1000);
        } else if (errors.length != 0) {
            setDisplay("block");
        } else {
            setDisplay("hidden");
        }
    }, [errors, dontShowIf]);

    return (
        <div className={`flex flex-col space-y-2 p-2 rounded bg-red-300 dark:bg-red-800 transition-opacity ${className != undefined ? className : ""} ${display}`}>
            {errors.map(function(msg, i) {
                return <p key={i}>{msg}</p>;
            })}
        </div>
    );
}
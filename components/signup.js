import {baseUrl} from "@/consts";
import {useState} from "react";

export default function Signup() {
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            email: event.target.email.value,
            password: event.target.password.value,
            password_confirm: event.target.confirmPassword.value,
        };

        fetch(baseUrl + "account/register/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        }).then(function(response) {
                if (!response.ok) {
                    return response.json();
                }
        }).then(function(result) {
            let msgs = [];
            for (const [key, value] of Object.entries(result)) {
                msgs.push(...value);
            }
            setErrors(msgs);
        })
    };

    function errorMessage() {
        console.log(errors);

        return (
            <div className="bg-red-300 rounded p-2" style={{display: errors === [] ? "" : "none"}}>
                {errors.map(function(msg, i){
                    return <p key={i}>{msg}</p>;
                })}
            </div>
        );
    }

    return (
        <div className="flex-col space-y-5 items-center">
            <div>
                {errorMessage()}
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
                <input className="flex border-2 p-0.5 rounded-sm" id="email" type="email" placeholder="Email" required/>
                <input className="flex border-2 p-0.5 rounded-sm" minLength="8" id="password" type="password" placeholder="Password" required/>
                <input className="flex border-2 p-0.5 rounded-sm" minLength="8" id="confirmPassword" type="password" placeholder="Confirm Password" required/>
                <button className="flex h-8 rounded-sm px-2.5 bg-std-blue hover:bg-std-blue-hover items-center text-white font-medium text-base" type="submit" value="Signup">Sign Up</button>
            </form>
        </div>
    );
}

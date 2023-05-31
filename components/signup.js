import {baseUrl} from "@/consts";

export default function Signup() {
    // Handles the submit event on form submit.
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault();

        // Get data from the form.
        const data = {
            first: event.target.first.value,
            last: event.target.last.value,
        };

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: "POST",
            // Tell the server we"re sending JSON.
            headers: {
                "Content-Type": "application/json",
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        };

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(baseUrl, options);

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json();
        alert(`Is this your full name: ${result.data}`);
    };
    return (
        // We pass the event to the handleSubmit() function on submit.
        <form action="/api/signup" method="POST">
            <input minLength="3" name="username" id="username" type="text" placeholder="username" required></input><br/>
            <input minLength="5" name="password" id="password" type="password" placeholder="password" required></input><br/>
            <input minLength="5" name="passwordagain" id="passwordagain" type="password" placeholder="password again" required></input><br/>
            <input type="submit" value="Signup"/>
        </form>
    );
}
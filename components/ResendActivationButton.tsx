import Button from "@/components/Button";

export default function ResendActivationButton({className, isLoading, setPayload}) {
    return (
        <Button className={` ${className}`} text="Resend" isLoading={isLoading} onClick={() => {setPayload({email: localStorage.getItem("email")})}}/>
    )
}
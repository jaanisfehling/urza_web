import Navbar from "@/components/navbar";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar></Navbar>
            <div className="grid grid-cols-2 gap-4">
                <div className="border-4 border-std-blue"></div>
            </div>
        </div>
    )
}
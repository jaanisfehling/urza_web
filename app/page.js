export default function Home() {
    return (
        <main className="flex min-h-screen bg-white flex-col">
            <div className="flex px-4 justify-between bg-white sticky h-14 w-full items-center border-std-blue border-b-2">
                <span className="text-2xl text-std-blue">Urza</span>
                <div className="flex space-x-4">
                    <button className="flex h-8 px-2.5 m-2 bg-std-blue hover:bg-std-blue-hover rounded-md items-center text-white font-medium text-base" type="button">
                        Login
                    </button>
                    <button className="flex h-8 px-2.5 m-2 bg-std-blue hover:bg-std-blue-hover rounded-md items-center text-white font-medium text-base" type="button">
                        Sign Up
                    </button>
                </div>
            </div>
            <div className="flex-col items-center m-auto space-y-5">
                <h1>
                    Hello world
                </h1>
                <button className="text-white bg-std-blue hover:bg-std-blue-hover font-medium rounded-lg text-base px-4 py-2.5">
                    Sign Up
                </button>
            </div>
        </main>
    )
}

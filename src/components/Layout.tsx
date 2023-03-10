import NavBar from "@/components/NavBar";

// @ts-ignore
export default function Layout({ children }) {
    return (
        <>
            <div className="min-h-full ">
                <div className="bg-gray-800 pb-32">
                   <NavBar />
                </div>

                <main className="-mt-32">
                    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-2xl">
                            <div className="mx-auto max-w-2xl py-3 px-4 sm:px-6 lg:max-w-7xl lg:px-8 text-black">
                        {children}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

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
                    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </>
    )
}

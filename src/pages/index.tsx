import Image from "next/image";
import QRCode from "@/images/qr-code.png";
import Link from "next/link";

export default function Home() {


    return (

        <div className="flex flex-col justify-center p-5 items-center">
            <h1 className="text-3xl font-bold text-center mb-2">Scan the code to interact 🎬</h1>
            <Link href="/stages/1?student=true">
                <Image alt="qr code" src={QRCode}/>
            </Link>
        </div>

    )
}

import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";

export function Navbar() {
    return (
        <div className="w-full flex justify-between items-center px-8 h-30">
            {/* Left side: Logo + Title */}
            <div className="flex items-center space-x-2 ml-30">
                <Image
                    src={logo}
                    alt="Logo"
                    width={60}
                    height={60}
                    className="object-contain"
                />

                <div className="flex flex-col leading-[0.6] -space-y-2">
                    <h1 className="text-black text-2xl font-bold p-0">APARTMENT</h1>
                    <h1 className="text-black text-2xl p-0">ELEVEN ELEVEN</h1>
                </div>
            </div>

            {/* Right side: Navigation */}
            <ul className="flex space-x-6 mr-30">
                <li>
                    <Link href="/" className="text-black hover:text-gray-200 cursor-pointer text-2xl">Home</Link>
                </li>
                <li>
                    <Link href="/elevators" className="text-black hover:text-gray-200 cursor-pointer text-2xl">Elevator's Waiting</Link>
                </li>
                <li>
                    <Link href="/residents" className="text-black hover:text-gray-200 cursor-pointer text-2xl">Our Residents</Link>
                </li>
                <li>
                    <Link href="/library" className="text-black hover:text-gray-200 cursor-pointer text-2xl">Library</Link>
                </li>
                <li>
                    <Link href="/inside" className="text-black hover:text-gray-200 cursor-pointer text-2xl">Inside Our Doors</Link>
                </li>
            </ul>
        </div>
    );
}

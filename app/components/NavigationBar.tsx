"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavigationBar() {
	const pathname = usePathname();

	return (
		<nav className='flex justify-center items-center space-x-4 p-4 bg-white shadow-md rounded-lg'>
			<Link
				href='/'
				className={`text-lg font-semibold p-2 transition-transform duration-200 rounded-md ${
					pathname === "/"
						? "bg-blue-500 text-white"
						: "hover:bg-blue-500 hover:text-white"
				}`}>
				Home
			</Link>
			<Link
				href='/gallery'
				className={`text-lg font-semibold p-2 transition-transform duration-200 rounded-md ${
					pathname === "/gallery"
						? "bg-blue-500 text-white"
						: "hover:bg-blue-500 hover:text-white"
				}`}>
				Gallery
			</Link>
			<Link
				href='/upload-button'
				className={`text-lg font-semibold p-2 transition-transform duration-200 rounded-md ${
					pathname === "/upload-button"
						? "bg-blue-500 text-white"
						: "hover:bg-blue-500 hover:text-white"
				}`}>
				Upload Image
			</Link>
		</nav>
	);
}

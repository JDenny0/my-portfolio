"use client";

import Image from "next/image";
import { useState } from "react";
import logo from "/public/images/logo/PhotographyLogo.png";

const links = [
	{ name: "Home", target: "home" },
	{ name: "About", target: "about" },
	{ name: "Portfolio", target: "portfolio" },
	{ name: "Contact", target: "contact" },
];

const Nav = ({ containerStyles }: { containerStyles?: string }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<nav className='fixed z-50 bg-transparent flex w-full justify-center items-center'>
			<div className='container mx-0 flex justify-around items-center py-6 px-4 md:px-11'>
				<div className='text-xl font-bold'>
					<Image
						className='m-0 p-0'
						src={logo}
						alt='Logo'
						width={200}
						height={40}
						priority={true}
					/>
				</div>
				<div className='hidden md:flex space-x-8'>
					{links.map((link, index) => (
						<a
							key={index}
							href={`/${link.target}`}
							className='cursor-pointer text-white font-semibold uppercase transition-transform duration-300 ease-in-out transform hover:scale-110 hover:text-stone-400'>
							{link.name}
						</a>
					))}
				</div>

				<button
					onClick={toggleMenu}
					className='md:hidden focus:outline-none'
					aria-label='Toggle Menu'>
					<svg
						className='w-7 h-7 text-white'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M4 6h16M4 12h16m-7 6h7'
						/>
					</svg>
				</button>
			</div>
			<div
				className={`md:hidden transition-max-height duration-300 ease-in-out overflow-hidden ${
					isOpen ? "max-h-40 menu-open" : "max-h-0 "
				}`}>
				{isOpen && (
					<div className='bg-white w-full'>
						{links.map((link, index) => (
							<a
								key={index}
								href={`/${link.target}`}
								className='block px-4 py-2 text-black hover:bg-gray-200'
								onClick={toggleMenu} // Close the menu on item click
							>
								{link.name}
							</a>
						))}
					</div>
				)}
			</div>
		</nav>
	);
};

export default Nav;

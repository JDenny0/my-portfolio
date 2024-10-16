"use client";

import React, { useEffect, useState } from "react";
import CustomButtonComponent from "./CustomButtonComponent";
import Nav from "./NavbarComponent";

const images = [
	"/images/hero-1.jpg",
	"/images/hero-6.jpg",
	"/images/hero-9.jpg",
];

const texts = [
	"Uhvatite momente zauvjek",
	"Vjenčanja koja oduševljavaju",
	"Svaki trenutak je važan",
];
const titles = [
	"Svadbe",
	"Portreti",
	"Proslave",
];

const HeroComponent: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	useEffect(() => {
		const intervalId = setInterval(nextSlide, 3000);
		return () => clearInterval(intervalId);
	}, []);

	const prevSlide = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + images.length) % images.length,
		);
	};

	return (
		<>
			
			<div className='relative w-full h-screen overflow-hidden flex justify-center items-end'>
				<div className='relative w-full h-full flex transition-opacity duration-1000'>
					{images.map((image, index) => (
						<div
							key={index}
							className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
								currentIndex === index ? "opacity-100" : "opacity-0"
							}`}>
							<img
								src={image}
								alt={`Slide ${index + 1}`}
								className='object-cover w-full h-full'
							/>
						</div>
					))}
				</div>

				<div className='absolute flex flex-col justify-center items-center w-full uppercase text-left px-4'>
					<span className='absolute text-white text-sm sm:text-lg md:text-xl hero-text'>
						{texts[currentIndex]}
					</span>
					<h1 className='text-white text-5xl sm:text-4xl md:text-7xl font-bold header-text'>
						{titles[currentIndex]} {/* Updated to use dynamic text */}
					</h1>

					<CustomButtonComponent
						containerStyles='block m-4 pt-2 w-[196px] h-[62px] mx-auto text-sm sm:text-base'
						text='View all'
					/>
				</div>

				<div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-1 space-x-2'>
					{images.map((_, index) => (
						<button
							key={index}
							className={`rounded-full ${
								currentIndex === index
									? "bg-gray-300 w-3 h-3"
									: "bg-yellow-950 w-2 h-2"
							}`}
							onClick={() => setCurrentIndex(index)}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default HeroComponent;

"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { fadeIn } from "@/lib/variants"

const images = [
	"/images/hero-1.jpg",
	"/images/hero-6.jpg",
	"/images/hero-3.jpg",
]

const texts = [
	<>
		<span className='text-yellow-800 font-extrabold  sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl'>
			Vjenčanja
		</span>{" "}
		koja oduševljavaju
	</>,
	<>
		<span className='text-yellow-800 font-extrabold sm:text-2xl  md:text-2xl lg:text-3xl xl:text-4xl'>
			Uhvatite
		</span>{" "}
		momente zauvjek
	</>,

	<>
		Svaki{" "}
		<span className='text-yellow-800 font-extrabold   sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl'>
			trenutak
		</span>{" "}
		je važan
	</>,
]

const titles = ["Svadbe", "Portreti", "Proslave"]

const HeroComponent: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState(0)

	const nextSlide = () => {
		setCurrentIndex(prevIndex => (prevIndex + 1) % images.length)
	}

	useEffect(() => {
		const intervalId = setInterval(nextSlide, 3000)
		return () => clearInterval(intervalId)
	}, [])

	const prevSlide = () => {
		setCurrentIndex(
			prevIndex => (prevIndex - 1 + images.length) % images.length
		)
	}

	return (
		<>
			<div className='w-full h-screen overflow-hidden'>
				<div className='relative w-full h-full flex transition-opacity duration-1000'>
					{images.map((image, index) => (
						<div
							key={index}
							className={`absolute inset-0 transition-opacity duration-1000 ease-in-out`}
							style={{
								backgroundImage: `url(${image})`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								opacity: currentIndex === index ? 1 : 0,
							}}
						/>
					))}
				</div>
				<div className='h-full flex justify-end pt-48'>
					<div className='flex flex-col items-center lg:items-start lg:max-w-[700px]'>
						<motion.h1
							variants={fadeIn("up", 0.4)}
							initial='hidden'
							whileInView={"show"}
							viewport={{ once: false, amount: 0.2 }}
							className='h1 text-center lg:text-left mb-2'>
							<span className='text-accent'>where hard </span>work meets success
						</motion.h1>
						<motion.p
							variants={fadeIn("up", 0.6)}
							initial='hidden'
							whileInView={"show"}
							viewport={{ once: false, amount: 0.2 }}
							className='text-white italic text-center lg:text-left mb-4'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Doloremque pariatur
						</motion.p>
						<motion.div
							variants={fadeIn("up", 0.8)}
							initial='hidden'
							whileInView={"show"}
							viewport={{ once: false, amount: 0.2 }}></motion.div>
					</div>
				</div>
				;
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
	)
}

export default HeroComponent

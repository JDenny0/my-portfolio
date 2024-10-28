"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { fadeIn } from "@/lib/variants"

interface TextProps {
	title: string
	description: string
	colorClass?: string
	currentIndex: number
	setCurrentIndex: (index: number) => void
}
const images = [
	"/images/hero-1.jpg",
	"/images/hero-9.jpg",
	"/images/hero-3.jpg",
	"/images/hero-4.jpg",
	"/images/hero-5.jpg",
]

const texts = [
	{
		title: "Wedding",
		description: "Moments captured to tell your love story",
		colorClass: "textColor",
	},
	{
		title: "Portrait",
		description: "Portraits that reveal your character",
		colorClass: "text-pink-600",
	},
	{
		title: "Celebration",
		description: "Joyful memories of life's special moments",
		colorClass: "textColorGreen",
	},
	{
		title: "Graduation",
		description: "Celebrating your achievements and milestones",
		colorClass: "textColorGreenish",
	},
	{
		title: "Sport",
		description: "Dynamic moments that showcase athletic excellence",
		colorClass: "text-white",
	},
	{
		title: "Product",
		description: "Showcasing your products with stunning visuals",
		colorClass: "text-gray-700",
	},
]

const CustomButtonComponent = ({
	text,
	containerStyles,
	colorClass,
}: {
	text: string
	containerStyles: string
	colorClass: string
}) => {
	return (
		<button className={`${containerStyles} primary-btn`}>
			<span
				className={`relative ${colorClass} transition font-extrabold text-xl z-10`}>
				{text}
			</span>
		</button>
	)
}

const Text: React.FC<TextProps> = ({
	title,
	description,
	colorClass = "",
	currentIndex,
	setCurrentIndex,
}) => {
	return (
		<div className='flex justify-center items-center'>
			<div className='flex flex-col align-middle justify-center lg:max-w-[700px] mt-56 md:mr-60 lg:mr-96'>
				<motion.h1
					variants={fadeIn("up", 0.4)}
					initial='hidden'
					whileInView={"show"}
					viewport={{ once: false, amount: 0.2 }}
					className={`font-extrabold text-4xl md:text-4xl lg:text-6xl xl:text-8xl mt-60 ${colorClass}`}>
					<span className='text-accent'>{title}</span>
				</motion.h1>
				<motion.p
					variants={fadeIn("up", 0.6)}
					initial='hidden'
					whileInView={"show"}
					viewport={{ once: false, amount: 0.2 }}
					className='text-white text-base md:text-xl lg:text-2xl xl:text-4xl italic'>
					{description}
				</motion.p>
				<motion.p
					variants={fadeIn("up", 0.6)}
					initial='hidden'
					whileInView={"show"}
					viewport={{ once: false, amount: 0.2 }}
					className='mt-4'>
					<CustomButtonComponent
						containerStyles='w-[196px] h-[62px] text-bold'
						text='See more'
						colorClass={colorClass}
					/>
				</motion.p>
			</div>
			<div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-3'>
				{images.map((_, index) => (
					<button
						key={index}
						className={`rounded-full transition duration-300 ease-in-out ${
							currentIndex === index
								? "bg-white w-3 h-3"
								: "bg-gray-500 w-2 h-2"
						}`}
						aria-label={`Go to slide ${index + 1}`}
						onClick={() => setCurrentIndex(index)}
					/>
				))}
			</div>
		</div>
	)
}

const HeroImages = () => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [fade, setFade] = useState(false)
	const [isPaused, setIsPaused] = useState(false)

	useEffect(() => {
		let intervalId: NodeJS.Timeout

		if (!isPaused) {
			intervalId = setInterval(() => {
				setFade(true)
				setTimeout(() => {
					setCurrentIndex(prevIndex => (prevIndex + 1) % images.length)
					setFade(false)
				}, 500)
			}, 3000)
		}

		return () => clearInterval(intervalId)
	}, [isPaused])

	return (
		<section
			className={`h-[100vh] lg:h-[912px] bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${
				fade ? "opacity-0" : "opacity-100"
			}`}
			style={{ backgroundImage: `url(${images[currentIndex]})` }}
			id='home'
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}>
			<div className='container mx-auto h-full'>
				<Text
					title={texts[currentIndex].title}
					description={texts[currentIndex].description}
					colorClass={texts[currentIndex].colorClass}
					currentIndex={currentIndex}
					setCurrentIndex={setCurrentIndex}
				/>
			</div>
		</section>
	)
}

export default HeroImages

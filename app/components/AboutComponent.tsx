"use client"
import { motion } from "framer-motion"

const fadeIn = (direction: string, delay: number) => {
	return {
		hidden: {
			opacity: 0,
			y: direction === "up" ? 20 : -20,
		},
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, delay },
		},
	}
}

const images = [
	"/images/about/about-1.jpg",
	"/images/about/about-2.jpg",
	"/images/about/about-3.jpg",
]

const About: React.FC = () => {
	return (
		<>
			<section
				className='h-[80vh] lg:h-[912px] bg-cover bg-center bg-no-repeat'
				style={{ backgroundImage: `url(/images/breadcrumb-bg.jpg)` }}>
				<div className='container mx-auto flex justify-center items-center text-white font-extrabold text-3xl md:text-5xl lg:text-7xl h-full text-shadow'>
					About
				</div>
			</section>
			<div className='flex flex-col md:flex-row bg-yellow-950 text-white p-8 md:p-12'>
				<div className='md:w-1/2 flex flex-col'>
					<div className='flex flex-wrap justify-center'>
						{images.map((src, index) => (
							<motion.div
								key={src}
								className='w-full md:w-1/2 p-2'>
								<motion.img
									src={src}
									alt={`Image ${index + 1}`}
									variants={fadeIn("up", (index + 1) * 0.2)}
									initial='hidden'
									whileInView='show'
									viewport={{ once: false, amount: 0.2 }}
									className='w-full h-auto object-cover rounded-lg shadow-lg'
									style={{ aspectRatio: "3/4" }}
								/>
							</motion.div>
						))}
					</div>
				</div>
				<div className='md:w-1/2 flex flex-col justify-center'>
					<div className='flex flex-col justify-center items-center h-full'>
						<motion.h2
							variants={fadeIn("up", 1)}
							initial='hidden'
							whileInView='show'
							viewport={{ once: false, amount: 0.2 }}
							className='text-2xl md:text-3xl font-bold mb-4 text-center'>
							Hello! I am Denis Jakubec, a passionate photographer with three
							years of experience in creating unforgettable images that tell
							stories. In my photography practice, I enjoy experimenting with
							different techniques and approaches. My wedding photography style
							comprises classic elegance, modern techniques, and romantic
							depictions. A wedding is one of the most special moments in life,
							and my goal is to capture every moment of that day in a way that
							allows you to remember the emotions and joy. I believe that the
							key lies in attention to detail, flexibility, and the ability to
							adapt to different situations. I strive to document every
							important moment, from the pivotal moments of the ceremony to
							spontaneous and genuine emotions.
						</motion.h2>
						<motion.p
							variants={fadeIn("up", 1.2)}
							initial='hidden'
							whileInView='show'
							viewport={{ once: false, amount: 0.2 }}
							className='text-white italic text-center lg:text-left mb-4 text-lg md:text-xl'>
							Although I am still in the development phase, every project and
							every moment I capture is an opportunity for me to learn and grow.
							Whether I’m working on portraits, landscapes, or commercial
							photography, I always focus on creating an image that will exceed
							expectations and remain etched in memory.
						</motion.p>
					</div>
				</div>
			</div>
		</>
	)
}

export default About

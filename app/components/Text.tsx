import React from "react"
import { motion } from "framer-motion"
import { fadeIn } from "@/lib/variants"
const Text = () => {
	return (
		<div>
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
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa nam
						adipisci consectetur, necessitatibus sint perspiciatis fugiat fugit
						maiores error numquam sequi molestias dolor accusamus
						exercitationem! Tempore mollitia molestiae debitis nemo.
					</motion.p>
					<motion.div
						variants={fadeIn("up", 0.8)}
						initial='hidden'
						whileInView={"show"}
						viewport={{ once: false, amount: 0.2 }}></motion.div>
				</div>
			</div>
		</div>
	)
}

export default Text

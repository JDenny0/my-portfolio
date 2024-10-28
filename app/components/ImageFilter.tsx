import React from "react"
import Link from "next/link"
import Image from "next/image"

interface ImageFilterProps {
	images: {
		key: string
		imageUrl: string
		type: keyof typeof imageTypes
	}[]
}

const imageTypes = {
	wedding: "wedding" as const,
	portrait: "portrait" as const,
	celebration: "celebration" as const,
	graduation: "graduation" as const,
	sport: "sport" as const,
	birthday: "birthday" as const,
}

const imagesTypes = [
	{ key: "1", imageUrl: "/images/portfolio/wedding.jpg", type: "wedding" },
	{ key: "2", imageUrl: "/images/portfolio/portrait.jpg", type: "portrait" },
	{
		key: "3",
		imageUrl: "/images/portfolio/celebration.jpg",
		type: "celebration",
	},
	{
		key: "4",
		imageUrl: "/images/portfolio/graduation.jpg",
		type: "graduation",
	},
	{ key: "5", imageUrl: "/images/portfolio/sport.jpg", type: "sport" },
	{ key: "6", imageUrl: "/images/portfolio/birthday.jpg", type: "birthday" },
]

const ImageFilter: React.FC<ImageFilterProps> = () => {
	const uniqueTypes = Object.keys(imageTypes) as Array<keyof typeof imageTypes>

	return (
		<div className='columns-1 gap-3 sm:columns-2 xl:columns-3 2xl:columns-4'>
			{uniqueTypes.map(type => {
				const filteredImages = imagesTypes.filter(image => image.type === type)
				const imageToDisplay = filteredImages[0]

				return (
					<Link
						key={type}
						href={`/gallery?type=${type}`}>
						<div className='relative m-2 cursor-pointer group w-64 h-64 lg:w-80 lg:h-80 md:w-64 md:h-64'>
							{imageToDisplay && (
								<>
									<Image
										src={imageToDisplay.imageUrl}
										alt={type}
										width={256}
										height={256}
										priority={true}
										className='absolute inset-0 w-full h-full object-cover rounded-md shadow-md opacity-50 transition-opacity duration-300 group-hover:opacity-100'
									/>
									<div className='absolute inset-0 flex items-center justify-center text-white text-2xl font-bold opacity-80 transition-opacity duration-300'>
										{type}
									</div>
								</>
							)}
						</div>
					</Link>
				)
			})}
		</div>
	)
}

export default ImageFilter

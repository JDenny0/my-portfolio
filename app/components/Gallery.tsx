import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

import { DatabaseImgArray } from "../gallery/page"

export type ImageGalleryProps = {
	data: DatabaseImgArray
}

const ImageGallery: FC<ImageGalleryProps> = ({ data }) => {
	if (!data || data.length === 0) return <p>No images available.</p>

	const portraitImgs = data.filter(img => img.orientation === "portrait")
	const landscapeImgs = data.filter(img => img.orientation === "landscape")

	const combinedData = [...portraitImgs, ...landscapeImgs]

	return (
		<div className=' h-screen m-0 p-0 w-full'>
			<div className='flex flex-wrap justify-center items-center gap-4 mt-20'>
				{combinedData.map(image => (
					<div
						key={image.key}
						className='relative w-48'>
						<Link href={`gallery/${image.key}`}>
							<Image
								src={image.imageUrl}
								alt={`Image of ${image.key}`}
								sizes='192px'
								width={192}
								height={289}
								priority={true}
							/>
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}

export default ImageGallery

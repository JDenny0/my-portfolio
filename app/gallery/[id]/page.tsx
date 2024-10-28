import Link from "next/link"
import { DatabaseImgArray } from "../page"
import Image from "next/image"
import CustomButtonComponent from "@/app/components/CustomButtonComponent"
import { Suspense } from "react"
import Loading from "@/app/loading"

interface PageProps {
	params: {
		id: string
		type: string
	}
}

interface FetchError {
	message: string
	status?: number
}

async function fetchImages(): Promise<DatabaseImgArray> {
	const apiUrl =
		process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/images"
	const response = await fetch(apiUrl, { cache: "no-store" })

	if (!response.ok) {
		throw new Error("Network response was not ok")
	}
	return await response.json()
}

export async function generateStaticParams() {
	const data = await fetchImages()

	return data.map(image => ({ id: image.key, type: image.type }))
}

export default async function Page({ params }: PageProps) {
	const { id, type } = params
	console.log(type)
	let image
	let error: FetchError | null = null

	try {
		const imagesArray = await fetchImages()
		image = imagesArray.find(img => img.key === id)
	} catch (err) {
		if (err instanceof Error) {
			error = { message: err.message }
		} else {
			error = { message: "Unknown error occurred" }
		}
	}

	if (error) {
		return <div>Error fetching images: {error.message}</div>
	}

	if (!image) {
		return <div>Image not found</div>
	}

	return (
		<Suspense fallback={<Loading />}>
			<div className='flex justify-center w-full p-4'>
				<div className='flex flex-col items-center justify-center mt-36 w-full max-w-4xl space-y-4 md:flex-row md:space-y-0 md:space-x-4'>
					<div className='flex justify-center'>
						<Image
							src={image.imageUrl}
							alt={`Image of ${id}`}
							width={400}
							height={600}
							priority={true}
							id='singleImage'
							className='max-w-full h-auto'
						/>
					</div>
					<div className='flex justify-center mr-56'>
						<Link
							href={`/imageFilter`}
							passHref>
							<CustomButtonComponent
								containerStyles='w-[196px] h-[62px]'
								text='GO Back'
							/>
						</Link>
					</div>
				</div>
			</div>
		</Suspense>
	)
}

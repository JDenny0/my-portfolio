import ImageGallery from "../components/Gallery"

export interface DatabaseImageData {
	_id: string
	key: string
	imageUrl: string
	orientation: "portrait" | "landscape"
	recent: boolean
	type: string
	createdAt: string
	updatedAt: string
	__v: number
}

export type DatabaseImgArray = DatabaseImageData[]

export interface FileUpload {
	id: string
	key: string
	name: string
	customId: string | null
	status: "Uploaded" | "Pending" | "Failed"
}

export interface ListFileResponse {
	hasMore: boolean
	files: FileUpload[]
}

export interface ImageData {
	key: string
	url: string
}

export interface DataArray {
	data: ImageData[]
}

const Gallery = async ({
	searchParams,
}: {
	searchParams: { type: string }
}) => {
	try {
		const response = await fetch("http://localhost:3000/api/images", {
			cache: "no-store",
		})
		const data: DatabaseImgArray = await response.json()

		const filteredData = data.filter(image => image.type === searchParams.type)
		console.log(filteredData[0].type)
		return (
			<div className='mx-auto h-full w-full flex relative'>
				<ImageGallery data={filteredData} />
			</div>
		)
	} catch (err) {
		return (
			<div className='flex justify-center'>
				<p>Error: {(err as Error).message}</p>
			</div>
		)
	}
}

export default Gallery

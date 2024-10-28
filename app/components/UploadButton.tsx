"use client"

import { useEffect, useState } from "react"
import { UploadButton } from "../utils/uploadthing"
import { useRouter } from "next/navigation"
import { revalidatePath } from "next/cache"
import { useSearchParams } from "next/navigation"

interface ServerData {
	uploadedBy: string
	imgUrl: string
}

interface FileObject {
	name: string
	size: number
	key: string
	serverData: ServerData
	url: string
	appUrl: string
	customId: string | null
	type: string
}

type FileObjectArray = FileObject[]

const UploadButtonComponent = () => {
	const router = useRouter()
	const [disableBtn, setDisableBtn] = useState<boolean>(true)
	const [orientation, setOrientation] = useState("portrait")
	const [type, setType] = useState("wedding")
	const [uploadedImageData, setUploadedImageData] = useState<{
		key: string
		imageUrl: string
	} | null>(null)
	const searchParams = useSearchParams()

	const imageType = searchParams.get("type")

	const [databaseImageData, setDatabaseImageData] = useState<{
		key: string
		imageUrl: string
		orientation: "landscape" | "portrait"
		type: string
		recent: boolean
	}>()
	const [uploadProgress, setUploadProgress] = useState<number>(0)

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()

		if (uploadedImageData && orientation && type) {
			const imageOrientation = orientation as "landscape" | "portrait"
			const imgType = type as
				| "wedding"
				| "portrait"
				| "birthday"
				| "celebration"
				| "graduation"
				| "interior"
				| "architecture"
				| "sport"

			setDatabaseImageData({
				...uploadedImageData,
				orientation: imageOrientation,
				type: imgType,
				recent: true,
			})
		}
	}

	useEffect(() => {
		if (uploadedImageData) {
			setDisableBtn(false)
		} else {
			setDisableBtn(true)
		}
	}, [uploadedImageData])

	useEffect(() => {
		const addImageToDB = async (imageData: {
			key: string
			imageUrl: string
			orientation: "landscape" | "portrait"
			type: string
			recent: boolean
		}) => {
			const response = await fetch("http://localhost:3000/api/images", {
				method: "POST",
				body: JSON.stringify(imageData),
			})

			if (response.status === 201) {
				setUploadedImageData(null)
				setDisableBtn(true)
			}
			try {
				setUploadedImageData(null)
				setDisableBtn(true)

				if (imageType) {
					await revalidatePath(`/gallery?type=${imageType}`)
					router.push(`/gallery?type=${imageType}`)
				} else {
					console.error("Image type is invalid or undefined")
				}
			} catch (error) {
				console.error("Error uploading image:", error)
			}
			return response
		}

		if (databaseImageData) {
			addImageToDB(databaseImageData)
		}
	}, [databaseImageData, router])

	const handleUploadProgress = (progress: number) => {
		setUploadProgress(progress)
	}

	return (
		<article className='flex min-h-screen flex-col items-center justify-between p-24'>
			<form
				onSubmit={handleSubmit}
				className='max-w-lg mx-auto p-4 bg-gray-800 rounded shadow-md'>
				<UploadButton
					endpoint='imageUploader'
					onClientUploadComplete={(res: FileObjectArray) => {
						const uploadedData: { imageUrl: string; key: string }[] =
							res &&
							res.map((item: FileObject) => {
								return {
									imageUrl: item.url,
									key: item.key,
								}
							})

						setUploadedImageData(uploadedData[0]!)
					}}
					onUploadProgress={handleUploadProgress}
					onUploadError={(error: Error) => {
						alert(`ERROR! ${error.message}`)
					}}
				/>

				{uploadProgress > 0 && (
					<div className='mt-4'>
						<div className='relative pt-1'>
							<div className='flex mb-2 items-center justify-between'>
								<div>
									<span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-gray-500'>
										Uploading: {uploadProgress}%
									</span>
								</div>
							</div>
							<div className='flex h-2 mb-2 overflow-hidden text-xs bg-gray-400 rounded'>
								<div
									style={{ width: `${uploadProgress}%` }}
									className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-500'
								/>
							</div>
						</div>
					</div>
				)}

				<h2 className='text-xl text-white font-bold mb-4'>Select Options</h2>

				<div className='mb-6'>
					<label className='block text-gray-400 mb-2'>Orientation</label>
					<div className='flex items-center'>
						<label className='mr-4 text-gray-400'>
							<input
								type='radio'
								value='landscape'
								checked={orientation === "landscape"}
								onChange={e => setOrientation(e.target.value)}
								className='mr-2 text-gray-400'
							/>
							Landscape
						</label>
						<label className='text-gray-400'>
							<input
								type='radio'
								value='portrait'
								checked={orientation === "portrait"}
								onChange={e => setOrientation(e.target.value)}
								className='mr-2 text-gray-400'
							/>
							Portrait
						</label>
					</div>
				</div>

				<div className='mb-6 text-gray-400'>
					<label className='block text-gray-400 mb-2'>Type</label>
					<div className='flex items-center'>
						<label className='mr-4'>
							<input
								type='radio'
								value='wedding'
								checked={type === "wedding"}
								onChange={e => setType(e.target.value)}
								className='mr-2'
							/>
							Wedding
						</label>
						<label className='mr-4'>
							<input
								type='radio'
								value='graduation'
								checked={type === "graduation"}
								onChange={e => setType(e.target.value)}
								className='mr-2'
							/>
							Graduation
						</label>
						<label className='mr-4'>
							<input
								type='radio'
								value='portrait'
								checked={type === "portrait"}
								onChange={e => setType(e.target.value)}
								className='mr-2'
							/>
							Portrait
						</label>
						<label className='mr-4'>
							<input
								type='radio'
								value='sport'
								checked={type === "sport"}
								onChange={e => setType(e.target.value)}
								className='mr-2'
							/>
							Sport
						</label>
						<label className='mr-4'>
							<input
								type='radio'
								value='celebration'
								checked={type === "celebration"}
								onChange={e => setType(e.target.value)}
								className='mr-2'
							/>
							Celebration
						</label>
						<label>
							<input
								type='radio'
								value='birthday'
								checked={type === "birthday"}
								onChange={e => setType(e.target.value)}
								className='mr-2'
							/>
							Birthday
						</label>
					</div>
				</div>

				<button
					type='submit'
					disabled={disableBtn}
					className='px-4 py-2 bg-blue-500 text-white rounded '>
					Submit
				</button>
			</form>
		</article>
	)
}

export default UploadButtonComponent

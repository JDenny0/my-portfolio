import { connectDB } from "@/app/utils/db"
import Image from "@/models/image-model"

//get recipes
export const GET = async (request: { url: string | URL }) => {
	try {
		await connectDB()

		const imageList = await Image.find({}).sort({
			createdAt: "desc",
		})

		if (!imageList || imageList.length === 0) {
			return new Response("No images to show", { status: 200 })
		}

		return new Response(JSON.stringify(imageList), { status: 200 })
	} catch (error) {
		return new Response("Failed to fetch images", { status: 500 })
	}
}

export const POST = async (request: { json: () => any }) => {
	const body = await request.json()

	try {
		const { key, imageUrl, orientation, recent, type } = body
		await connectDB()

		if (!key || !imageUrl || !orientation || !recent || !type) {
			return new Response("Please fill all fields", { status: 400 })
		}

		const image = await Image.create({
			key,
			imageUrl,
			orientation,
			recent,
			type,
		})

		return new Response(JSON.stringify(image), { status: 201 })
	} catch (error) {
		console.error(error)
		return new Response("Failed to add image", { status: 500 })
	}
}

import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI || ""

if (!MONGO_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env.local"
	)
}
let isConnected = false
export const connectDB = async () => {
	if (isConnected) {
		console.log("Database is already connected")

		return
	}

	try {
		await mongoose.connect(MONGO_URI)

		isConnected = true

		console.log(`MongoDB connected.`)
	} catch (error) {
		console.log(`Error: ${error}`)

		process.exit(1)
	}
}

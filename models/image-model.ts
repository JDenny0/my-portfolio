import mongoose from "mongoose"

const ImageSchema = new mongoose.Schema(
	{
		key: {
			type: String,
			required: [true, "Please add key"],
		},
		imageUrl: {
			type: String,
			required: [true, "Please add imageUrl"],
		},
		orientation: {
			type: String,
			enum: ["landscape", "portrait"],
			default: "portrait",
			required: [true, "Please add orientation"],
		},
		recent: {
			type: String,
			required: [true, "Please add recent Images"],
		},

		type: {
			type: String,
			enum: [
				"wedding",
				"portrait",
				"birthday",
				"celebration",
				"graduation",
				"interior",
				"arhitecture",
				"sport",
			],
			default: "wedding",
			required: [true, "Please select a type of the image"],
		},
	},
	{
		timestamps: true,
	}
)

const Image = mongoose.models.Image || mongoose.model("Image", ImageSchema)

export default Image

import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"

const f = createUploadthing()

const auth = async (_req: Request) => ({ id: "fakeId" })

export const ourFileRouter = {
	imageUploader: f({ image: { maxFileSize: "16MB" } })
		.middleware(async ({ req }) => {
			const user = await auth(req)

			if (!user) throw new UploadThingError("Unauthorized")

			return { userId: user.id }
		})
		.onUploadComplete(async ({ metadata, file }) => {
			return { uploadedBy: metadata.userId, imgUrl: file.url }
		}),
	mediaPost: f({
		image: { maxFileSize: "32MB", maxFileCount: 4 },
		video: { maxFileSize: "256MB", maxFileCount: 1 },
	})
		.middleware(({ req }) => auth(req))
		.onUploadComplete(data => console.log("file", data)),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter

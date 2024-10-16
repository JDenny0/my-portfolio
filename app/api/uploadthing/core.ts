import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const auth = async (_req: Request) => ({ id: 'fakeId' }) // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f({ image: { maxFileSize: '16MB' } })
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }) => {
			// This code runs on your server before upload
			const user = await auth(req)

			// If you throw, the user will not be able to upload
			if (!user) throw new UploadThingError('Unauthorized')

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { userId: user.id }
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			console.log('Upload complete for userId:', metadata.userId)

			console.log('file url', file.url)

			console.log(file)
			//  Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			return { uploadedBy: metadata.userId, imgUrl: file.url }
		}),
	// Takes up to 4 2mb images and/or 1 256mb video
	mediaPost: f({
		image: { maxFileSize: '16MB', maxFileCount: 4 },
		video: { maxFileSize: '256MB', maxFileCount: 1 },
	})
		.middleware(({ req }) => auth(req))
		.onUploadComplete(data => console.log('file', data)),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter

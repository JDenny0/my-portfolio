import { utapi } from "../../../server/uploadthing"
import { NextResponse } from "next/server"

export async function GET() {
	try {
		const files = await utapi.listFiles()

		const keys = files.files.map(file => file.key)

		const multipleUrls = await utapi.getFileUrls(keys)

		const galleryList = NextResponse.json(multipleUrls)
		return galleryList
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}

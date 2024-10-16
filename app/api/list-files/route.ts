import { utapi } from '../../../server/uploadthing'
import { NextResponse } from 'next/server'

// export interface FileUpload {
// 	id: string;
// 	key: string;
// 	name: string;
// 	customId: string | null;
// 	status: "Uploaded" | "Pending" | "Failed"; // Adjust the status options as needed
// }


export async function GET() {
	try {
		// Fetch all files data
		const files = await utapi.listFiles()

		const keys = files.files.map(file => file.key)
		//use keys that you get from files to get fileUrls
		const multipleUrls = await utapi.getFileUrls(keys)
		return NextResponse.json(multipleUrls) // Return files as JSON

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
	
}

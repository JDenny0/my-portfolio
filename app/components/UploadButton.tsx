'use client'

import { UploadButton } from '../utils/uploadthing'
import { useRouter } from 'next/navigation'

const UploadButtonComponent = () => {
	const router = useRouter()

	return (
		<article className='flex min-h-screen flex-col items-center justify-between p-24'>
			<UploadButton
				endpoint='imageUploader'
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				onClientUploadComplete={(res: any) => {
					// Do something with the response

					alert('Upload Completed')
					//after upload is done redirect to gallery
					router.push('/gallery')
				}}
				onUploadError={(error: Error) => {
					// Do something with the error.
					alert(`ERROR! ${error.message}`)
				}}
			/>
		</article>
	)
}
export default UploadButtonComponent

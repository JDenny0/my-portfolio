import HeroComponent from './components/HeroComponent'
import UploadButtonComponent from './components/UploadButton'

export default function Home() {
	return (
		<div className='w-full'>
			<main className='flex flex-col gap-8 row-start-2 justify-between items-center sm:items-start'>
				<div className='flex flex-row justify-evenly w-full'>
					{/* currently upload button is component on the home page there is also separated page for the upload button in case you want to have different home page, currently homepage and upload image page are the same    */}
					<HeroComponent />
					{/* <UploadButtonComponent /> */}
				</div>
			</main>
		</div>
	)
}

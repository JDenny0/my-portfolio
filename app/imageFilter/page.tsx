import ImageFilter from "../components/ImageFilter"

const Imagefilter = () => {
	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div className=''>
				<h2 className='text-center mb-4 text-xl font-semibold'>Image Filter</h2>
				<div className=''>
					<ImageFilter images={[]} />
				</div>
			</div>
		</div>
	)
}

export default Imagefilter

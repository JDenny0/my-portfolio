const CustomButtonComponent = ({
	text,
	containerStyles,
}: {
	text: string
	containerStyles: string
}) => {
	return (
		<button className={`${containerStyles} primary-btn`}>
			<span className='relative  transition  font-extrabold text-xl z-10'>
				{text}
			</span>
		</button>
	)
}

export default CustomButtonComponent

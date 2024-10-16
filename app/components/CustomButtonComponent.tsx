const CustomButtonComponent = ({
	text,
	containerStyles,
}: {
	text: string;
	containerStyles: string;
}) => {
	return (
		<button
			className={`${containerStyles} primary-btn group relative cursor-pointer overflow-hidden rounded-lg transition duration-300 ease-in-out bg-transparent `}>
			{/* Gradient background on hover */}
			<div className='absolute inset-0  opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-lg'></div>

			{/* animation span */}
			<span className='ease absolute top-1/2 h-0 w-64 origin-center -translate-x-20 rotate-45  transition-all duration-300 group-hover:h-64 group-hover:-translate-y-32'></span>

			<span className='relative text-white transition duration-300 group-hover:text-white z-10'>
				{text}
			</span>
		</button>
	);
};

export default CustomButtonComponent;

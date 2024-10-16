import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import CustomButtonComponent from "./CustomButtonComponent";

export type ImageGalleryProps = {
	data: { key: string; url: string }[];
	itemsPerPage?: number; // Optional prop to set items per page
};

// Server component
const ImageGallery: FC<ImageGalleryProps> = async ({
	data,
	itemsPerPage = 6,
}) => {
	if (!data || data.length === 0) return <p>No images available.</p>;

	// Pagination logic
	const totalPages = Math.ceil(data.length / itemsPerPage);

	// You can pass currentPage through props or manage it via URL params for real scenarios
	const currentPage = 1; // This would be dynamic in a real application

	// Calculate the current data slice
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

	return (
		<div className='bg-yellow-950 h-screen m-0 p-0 w-full'>
			<div className='flex flex-wrap justify-center items-center gap-4 mt-20'>
				{paginatedData.map((image) => (
					<div key={image.key} className='relative w-48'>
						<Link href={`gallery/${image.key}`}>
							<Image
								src={image.url}
								alt={`Image of ${image.key}`}
								sizes='192px'
								width={192}
								height={289}
								priority={true}
							/>
						</Link>
					</div>
				))}
			</div>
			{/* Pagination Controls - static for this example */}
			<div className='flex justify-center mt-6'>
				<span className='self-center'>{`Page ${currentPage} of ${totalPages}`}</span>
			</div>
			<CustomButtonComponent
				containerStyles='primary-btn w-[196px] h-[62px] mx-auto '
				text='View all'
			/>
		</div>
	);
};

export default ImageGallery;

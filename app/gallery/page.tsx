// app/gallery/page.tsx
import ImageGallery from "../components/Gallery";
 // Adjust the import based on where you store your types
export interface FileUpload {
	id: string;
	key: string;
	name: string;
	customId: string | null;
	status: "Uploaded" | "Pending" | "Failed"; // Adjust the status options as needed
}
export interface ListFileResponse {
	hasMore: boolean;
	files: FileUpload[];
}


export interface ImageData {
  key: string;
  url: string;
}

export interface DataArray {
  data: ImageData[];
}

const Gallery = async () => {
	try {
		const response = await fetch("http://localhost:3000/api/list-files"); // Adjust URL as necessary
		if (!response.ok) {
			throw new Error("Failed to fetch images");
		}
		const data:DataArray = await response.json();


		return (
			<div className=' mx-auto h-full w-full flex '>
				<ImageGallery data={data.data} itemsPerPage={6} />
			</div>
		);
	} catch (err) {
		console.error(err);
		return (
			<div className='flex justify-center'>
				<p>Error: {(err as Error).message}</p>
			</div>
		);
	}
};

export default Gallery;

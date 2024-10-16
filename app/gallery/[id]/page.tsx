
import { DataArray } from "../page";
import Image from "next/image";

interface PageProps {
  params: {
    id: string;
  };
}


// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const images = await fetch("http://localhost:3000/api/list-files");
  const data:DataArray = await images.json();
  const imagesArray = data.data
  return imagesArray.map((image) => ({
    id: image.key,
  }))

}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({ params }: PageProps) {
  const { id } = params;

  // Fetch the image data on the server-side inside the component
  const images = await fetch("http://localhost:3000/api/list-files");
  const data: DataArray = await images.json();
  const imagesArray = data.data;

  // Find the image that matches the `id` from the URL
  const image = imagesArray.find((img) => img.key === id);

  // If image is not found, handle it appropriately (e.g., return a 404 page)
  if (!image) {
    return <div>Image not found</div>;
  }

  return (
    <div className="flex justify-center align-center w-full">
      <Image
        src={image.url}
        alt={`Image of ${id}`}
        width={400}
        height={600}
        priority={true}
        id="singleImage"
       
      />
    </div>
  );
}


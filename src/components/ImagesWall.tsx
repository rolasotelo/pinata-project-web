import {ImageType} from "@/pages/stages/[id]";

type Props = {
    images: ImageType[]
}
export default function ImagesWall({images}: Props)  {
    return (
        <div
            className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {images.map((image) => (
                <div key={image.id} className="group relative">
                    <div
                        className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                        <img
                            src={image.image_url}
                            alt={image.prompt}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"

                        />
                    </div>
                    <div className="mt-4 flex justify-between">
                        <div>
                            <h3 className="text-sm text-gray-700">
                                <a href={image.image_url} target="_blank">
                                    <span aria-hidden="true" className="absolute inset-0"/>
                                    {image.prompt}
                                </a>
                            </h3>

                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}
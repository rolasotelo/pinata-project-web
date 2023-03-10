import {ImageType} from "@/components/TextToImageForm";

type Props = {
    image: ImageType
}
export default function DoubleImageCard({image}: Props) {

    return (
        <div
            key={image.id}
            className="col-span-2 group relative flex flex-col overflow-hidden rounded-lg border border-2 border-teal-700 bg-pink-300"
        >
            <div className="flex flex-row">
            <div className="aspect-w-1 w-full aspect-h-1 bg-gray-200 group-hover:opacity-75 sm:aspect-none">
                <img
                    src={image.input_url}
                    alt={image.prompt}
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                />
            </div>
                <div className="aspect-w-1 w-full aspect-h-1 bg-gray-200 group-hover:opacity-75 sm:aspect-none">
                    <img
                        src={image.image_url}
                        alt={image.prompt}
                        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                    />
                </div>
            </div>
            <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-800">
                    <a href={image.image_url} target="_blank">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {image.prompt_context}
                    </a>
                </h3>
                <p className="text-sm">{image.prompt}</p>
            </div>
        </div>
    )
}
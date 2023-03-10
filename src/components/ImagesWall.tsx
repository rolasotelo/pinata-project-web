import {ImageType} from "@/components/TextToImageForm";
import SingleImageCard from "@/components/SingleImageCard";
import DoubleImageCard from "@/components/DoubleImageCard";


type Props = {
    images: ImageType[]
}
export default function ImagesWall({images}: Props) {
    return (
        <div className="bg-gray-800 py-2 rounded-2xl">
            <div className="mx-auto max-w-7xl px-6 lg:px-6">
                <div
                    className="my-4 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-2">
                    {images.map((image) => {
                        if (image.input_url) {
                            return <DoubleImageCard image={image} key={image.id}/>
                        } else {
                            return <SingleImageCard image={image} key={image.id}/>
                        }
                    })}
                </div>
            </div>
        </div>
    )
}
import {useQuery} from "react-query";
import {useState} from "react";
import Prompt from "@/components/Prompt";

type Image = {
    id: string
    image_url: string
    prompt: string
}

export default function Home() {

    const [images, setImages] = useState<Image[]>([])

    // Query images from the API
    const query = useQuery('todos', ()=>{
        return fetch('http://localhost:3000/images?stage=3',{
            method: 'GET',
        })
            .then(res => res.json())
    }, {
        onSuccess: (data) => {
            console.log(data)
            setImages(data['images'])
        }
    })



    return (
        <div className="bg-white rounded-2xl">

            <div className="mx-auto max-w-2xl py-10 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <Prompt/>
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
            </div>
        </div>
    )
}

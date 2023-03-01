import {useQuery, useMutation} from "react-query";
import {useState} from "react";
import Prompt from "@/components/Prompt";
import {useRouter} from "next/router";

type Image = {
    id: string
    image_url: string
    prompt: string
}
const api = process.env.NEXT_PUBLIC_API_URL

export default function Stage() {
    const router = useRouter()
    const { id } = router.query

    const stage = Number.parseInt(id as string)

    const [images, setImages] = useState<Image[]>([])

    // Query images from the API
    const query = useQuery(`stage-${stage}`, ()=>{
        return fetch(`${api}/images?stage=${stage}`,{
            method: 'GET',
        })
            .then(res => res.json())
    }, {
        onSuccess: (data) => {
            setImages(data['images'])
        },
        enabled: id !== undefined
    })

    // post prompt to the API
    const { mutate } = useMutation(
        (prompt: string) => {
            return fetch(`${api}/images?prompt=${prompt}&stage=${stage}`, {
                method: 'PUT',
            })
                .then(res => res.json()).then(data => {
                    setImages([data,...images])
                })
        }
    )

    // Submit prompt to the API
    const onSubmit = (prompt: string) => {

        // encode prompt to base64
        const encodedPrompt = btoa(prompt)
        mutate(encodedPrompt)

    }



    return (
        <div className="bg-white rounded-2xl">

            <div className="mx-auto max-w-2xl py-10 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <Prompt onSubmit={onSubmit}/>
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

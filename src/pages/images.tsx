import ImagesWall from "@/components/ImagesWall";
import {useState} from "react";
import {ImageType} from "@/components/TextToImageForm";
import {useQuery} from "react-query";

const api = process.env.NEXT_PUBLIC_API_URL
export default function Images() {

    const [images, setImages] = useState<ImageType[]>([])

    // Query images from the API
    const query = useQuery(`images`, () => {
        return fetch(`${api}/images`, {
            method: 'GET',
        })
            .then(res => res.json())
    }, {
        onSuccess: (data) => {
            setImages(data['images'])
        }
    })

    return (
        <>
            <h1 className="text-3xl font-bold text-center mb-2">All your images 🖼️</h1>

            <ImagesWall images={images}/>
            </>


    )
}
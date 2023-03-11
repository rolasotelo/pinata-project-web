import {useForm, SubmitHandler} from "react-hook-form";
import {useMutation, useQuery} from "react-query";
import {useRouter} from "next/router";
import {useState} from "react";
import ImagesWall from "@/components/ImagesWall";
import {PhotoIcon} from "@heroicons/react/20/solid";

type Inputs = {
    prompt: string,
};


export type ImageType = {
    id: string
    image_url: string
    input_url: string
    prompt: string
    prompt_context: string
}

export function ImageDivider() {
    return (
        <div className="relative py-2">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"/>
            </div>
            <div className="relative flex justify-center">
        <span className="bg-white px-2 text-gray-500">
          <PhotoIcon className="h-5 w-5 text-gray-500" aria-hidden="true"/>
        </span>
            </div>
        </div>
    )
}

type Props = {
    question: string
    question_es: string
    question_cz: string

    children?: React.ReactNode
}

const api = process.env.NEXT_PUBLIC_API_URL
export default function TextToImageForm(props: Props) {

    const router = useRouter()
    const {id} = router.query

    const stage = Number.parseInt(id as string)

    const [images, setImages] = useState<ImageType[]>([])

    const {register, handleSubmit, formState: {errors}, resetField} = useForm<Inputs>();
    const onSubmitForm: SubmitHandler<Inputs> = data => {

        // clean input from text
        resetField('prompt')
        onSubmit(data.prompt)
    }

    // Query images from the API
    const query = useQuery(`stage-${stage}`, () => {
        return fetch(`${api}/images?stage=${stage}`, {
            method: 'GET',
        })
            .then(res => res.json())
    }, {
        onSuccess: (data) => {
            setImages(data['images'])
        },
        enabled: id !== undefined
    })

    const encodedPromptContext = btoa(props.question);

    // post prompt to the API
    const {mutate} = useMutation(
        (prompt: string) => {
            return fetch(`${api}/images?prompt=${prompt}&stage=${stage}&prompt_context=${encodedPromptContext}`, {
                method: 'POST',
            })
                .then(res => res.json()).then(data => {
                    setImages([data, ...images])
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
        <>
            <div className="bg-gray-800 py-6 rounded-2xl">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
                    <div className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:col-span-7">
                        <h2 className="inline sm:block lg:inline xl:block">{props.question}</h2>{' '}
                        <p className="inline sm:block lg:inline xl:block underline decoration-dashed text-teal-500">{props.question_es}</p>
                        <span className="text-3xl text-pink-500 underline decoration-dotted">{props.question_cz}</span>
                    </div>
                    <form className="w-full max-w-md lg:col-span-5 lg:pt-2" onSubmit={handleSubmit(onSubmitForm)}>
                        <div className="flex gap-x-4">
                            <label htmlFor="image-prompt" className="sr-only">
                                Prompt
                            </label>
                            <input
                                id="image-prompt"
                                type="text"
                                required
                                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                placeholder="What are you thinking?"
                                {...register("prompt", {required: true})}

                            />
                            <button
                                type="submit"
                                className="flex-none rounded-md bg-pink-500 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Submit
                            </button>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-gray-300">
                            Look at your answers bellow 🤞🏽!
                        </p>
                    </form>
                </div>
            </div>
            {props.children}
            <ImageDivider/>
            <ImagesWall images={images}/>
        </>
    )
}

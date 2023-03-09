import {useQuery, useMutation} from "react-query";
import { useState} from "react";
import TextToImageForm from "@/components/TextToImageForm";
import {useRouter} from "next/router";
import ImagesWall from "@/components/ImagesWall";
import ImageAndTextToImageForm from "@/components/ImageAndTextToImageForm";
import {getPostData} from "@/lib/getArticles";
import {renderMarkdown} from "@/lib/renderMarkdown";
import {MDXRemote} from "next-mdx-remote";

export type Image = {
    id: string
    image_url: string
    prompt: string
}
const api = process.env.NEXT_PUBLIC_API_URL

// @ts-ignore
export default function Stage({stageData, html}) {
    const router = useRouter()
    const {id, student} = router.query

    const stage = Number.parseInt(id as string)

    const [images, setImages] = useState<Image[]>([])

    console.log(stageData.title)


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

    // post prompt to the API
    const {mutate} = useMutation(
        (prompt: string) => {
            return fetch(`${api}/images?prompt=${prompt}&stage=${stage}`, {
                method: 'PUT',
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

    const form = student === 'true' ? (<ImageAndTextToImageForm/>) : (<TextToImageForm onSubmit={onSubmit}/>)

    return (
        <>
            <h1 className="text-4xl font-bold text-center mb-10">{stageData.title}</h1>
            {form}
            <ImagesWall images={images}/>
            <hr className="my-10"/>
            <MDXRemote {...html}/>
        </>
    )
}

export async function getStaticPaths() {
    const paths = [{
        params: {
            id: '1',
        }
    }, {
        params: {
            id: '2',
        }
    }, {
        params: {
            id: '3',
        }
    }, {
        params: {
            id: '4',
        }
    }, {
        params: {
            id: '5',
        }
    }, {
        params: {
            id: '6',
        }
    },
        {
            params: {
                id: '7',
            }
        }
    ];
    return {
        paths,
        fallback: false
    }
}

type Params = {
    id: string
}
type PropsGSP = { params: Params }

type IdToFileNameType = {
    [key: string]: string
}

export async function getStaticProps(context: PropsGSP) {
    console.log('context', context)
    const idToFileName: IdToFileNameType = {
        '1': 'me',
        '2': 'mexico',
        '3': 'history',
        '4': 'culture',
        '5': 'food',
        '6': 'oaxaca',
        '7': 'humanvsai'
    }
    const params = context.params;
    const stageData = getPostData(idToFileName[params.id]);
    const renderHTML = await renderMarkdown(stageData.content)
    return {
        props: {
            stageData,
            html: renderHTML
        },
    };
}
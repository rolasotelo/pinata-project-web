import TextToImageForm from "@/components/TextToImageForm";
import {useRouter} from "next/router";
import ImageAndTextToImageForm from "@/components/ImageAndTextToImageForm";
import {getSlideData} from "@/lib/getSlides";
import {renderMarkdown} from "@/lib/renderMarkdown";
import {MDXRemote} from "next-mdx-remote";

// @ts-ignore
export default function Stage({stageData, html}) {

    const router = useRouter()
    const {student} = router.query

    const form = stageData.form === 'canvas' ? (<ImageAndTextToImageForm/>) : (
        <TextToImageForm question={stageData.question} question_es={stageData.question_es}
                         question_cz={stageData.question_cz}/>)

    return (
        <>
            <h1 className="text-3xl font-bold text-center mb-5">{stageData.title}</h1>
            {form}
            {student !== 'true' && (<>
                <hr className="my-5"/>
                <MDXRemote {...html}/></>)}
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
    const stageData = getSlideData(idToFileName[params.id]);
    const renderHTML = await renderMarkdown(stageData.content)
    return {
        props: {
            stageData,
            html: renderHTML
        },
    };
}
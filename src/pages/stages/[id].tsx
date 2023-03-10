import TextToImageForm from "@/components/TextToImageForm";
import {useRouter} from "next/router";
import ImageAndTextToImageForm from "@/components/ImageAndTextToImageForm";
import {getSlideData} from "@/lib/getSlides";
import {renderMarkdown} from "@/lib/renderMarkdown";
import {MDXRemote} from "next-mdx-remote";

import {BookOpenIcon, LightBulbIcon} from '@heroicons/react/20/solid'

function SlideDivider() {
    return (
        <div className="relative py-2">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"/>
            </div>
            <div className="relative flex justify-center">
        <span className="bg-white px-2 text-gray-500">
          <BookOpenIcon className="h-5 w-5 text-gray-500" aria-hidden="true"/>
        </span>
            </div>
        </div>
    )
}

function QuestionDivider() {
    return (
        <div className="relative py-2">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"/>
            </div>
            <div className="relative flex justify-center">
        <span className="bg-white px-2 text-gray-500">
          <LightBulbIcon className="h-5 w-5 text-gray-500" aria-hidden="true"/>
        </span>
            </div>
        </div>
    )
}


// @ts-ignore
export default function Stage({stageData, html}) {

    const router = useRouter()
    const {student} = router.query

    const form = stageData.form === 'canvas' ? (
        <ImageAndTextToImageForm question={stageData.question} question_es={stageData.question_es}
                                 question_cz={stageData.question_cz}/>) : (
        <TextToImageForm question={stageData.question} question_es={stageData.question_es}
                         question_cz={stageData.question_cz}/>)

    return (
        <>
            <h1 className="text-3xl font-bold text-center">{stageData.title}</h1>
            <QuestionDivider/>
            {form}
            {student !== 'true' && (<>
                <SlideDivider/>
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
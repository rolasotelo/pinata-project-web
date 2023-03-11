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

    const slides = student !== 'true' && (<>
        <SlideDivider/>
        <MDXRemote {...html} components={{
            h1: (props) => <h1 {...props} className="text-3xl font-bold text-center py-4 bg-pink-50 rounded-2xl mx-40"/>,
            h2: (props) => <h1 {...props} className="text-2xl font-bold text-gray-800 text-center py-3 bg-teal-50 rounded-2xl mx-40"/>,
            h3: (props) => <h1 {...props} className="text-xl font-bold text-pink-800 text-center py-3"/>,
            h4: (props) => <h1 {...props} className="text-2xl font-bold text-center py-2"/>,
            p: (props) => <p {...props} className="text-xl text-center py-4 mx-40"/>,
            img: (props) => {
                return (
                    <img {...props} className="w-7/12 mx-auto"/>
                )
            },
            ul: (props) => <ul {...props} className="text-xl justify-around w-5/12 mx-auto pb-8"/>,
            hr: (props) => <hr {...props} className="w-9/12 mx-auto py-4"/>,
        }}/></>)

    return (
        <>
            <h1 className="text-3xl font-bold text-center">{stageData.title}</h1>
            <QuestionDivider/>
            {stageData.form !== 'canvas' && <TextToImageForm question={stageData.question} question_es={stageData.question_es}
                             question_cz={stageData.question_cz}>{slides}</TextToImageForm>}
            {stageData.form === 'canvas' && <ImageAndTextToImageForm question={stageData.question} question_es={stageData.question_es}
                                                             question_cz={stageData.question_cz}>{slides}</ImageAndTextToImageForm>}
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
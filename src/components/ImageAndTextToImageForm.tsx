import {useState} from "react";
import naughtyWords from "naughty-words";
import sleep from "@/lib/sleep";
import seeds from "@/lib/seeds";
import CanvasPrompt from "@/components/CanvasPrompt";
import Canvas from "@/components/Canvas";
import uploadFile from "@/lib/upload";
import Script from "next/script";
import Predictions from "@/components/Predictions";
import {useMutation} from "react-query";
import {useRouter} from "next/router";

const api = process.env.NEXT_PUBLIC_API_URL

type Props = {
    question: string
}
type MutationInputs = {prompt: string, input_url: string, prompt_context: string, image_url: string}


export default function ImageAndTextToImageForm(props: Props) {
    const [error, setError] = useState(null);
    const [submissionCount, setSubmissionCount] = useState(0);
    const [predictions, setPredictions] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [scribble, setScribble] = useState<string>("");
    const [seed] = useState(seeds[Math.floor(Math.random() * seeds.length)]);
    const [scribbleExists, setScribbleExists] = useState(false);
    const [initialPrompt] = useState(seed.prompt);

    const router = useRouter()
    const {id} = router.query

    const stage = Number.parseInt(id as string)


    const {mutate} = useMutation(

        // @ts-ignore
        (input :MutationInputs) => {
            const {prompt, input_url, prompt_context, image_url} = input
            return fetch(`${api}/images?prompt=${prompt}&stage=${stage}&input_url=${input_url}&image_url=${image_url}&prompt_context=${prompt_context}`, {
                method: 'POST',
            })
                .then(res => res.json()).then(data => {
                    console.log(data)
                })
        }
    )

    const handleSubmit = async (e: { preventDefault: () => void; target: { prompt: { value: string; }; }; }) => {
        e.preventDefault();

        // track submissions so we can show a spinner while waiting for the next prediction to be created
        setSubmissionCount(submissionCount + 1);

        const prompt = e.target.prompt.value
            .split(/\s+/)
            .map((word: string) => (naughtyWords.en.includes(word) ? "something" : word))
            .join(" ");

        setError(null);
        setIsProcessing(true);

        const fileUrl = await uploadFile(scribble);

        const body = {
            prompt,
            image: fileUrl,
        };

        const response = await fetch("/api/predictions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        let prediction = await response.json();

        setPredictions((predictions) => ({
            ...predictions,
            [prediction.id]: prediction,
        }));

        if (response.status !== 201) {
            setError(prediction.detail);
            return;
        }

        let new_response;

        while (
            prediction.status !== "succeeded" &&
            prediction.status !== "failed"
            ) {
            await sleep(500);
            const response = await fetch("/api/predictions/" + prediction.id);
            prediction = await response.json();
            new_response = prediction
            setPredictions((predictions) => ({
                ...predictions,
                [prediction.id]: prediction,
            }));
            if (response.status !== 200) {
                setError(prediction.detail);
                return;
            }
        }

        const encodedPrompt = btoa(prompt);
        const encodedPromptContext = btoa(props.question);
        mutate({prompt: encodedPrompt, input_url: fileUrl, prompt_context: encodedPromptContext, image_url: new_response.output[new_response.output.length - 1]})

        setIsProcessing(false);
    };

    return (
        <div className="container max-w-[512px] mx-auto">
            <Canvas
                startingPaths={seed.paths}
                onScribble={setScribble}
                scribbleExists={scribbleExists}
                setScribbleExists={setScribbleExists}

            />

            <CanvasPrompt
                initialPrompt={initialPrompt}
                onSubmit={handleSubmit}
                scribbleExists={scribbleExists}
            />
            {/*@ts-ignore*/}
            <Predictions
                predictions={predictions}
                submissionCount={submissionCount}
            />
            <Script src="https://js.upload.io/upload-js-full/v1"/>
        </div>


    )
}

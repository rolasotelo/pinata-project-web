import {useEffect, useState} from "react";

type Props = {
    initialPrompt: string;
    onSubmit: (e: { preventDefault: () => void, target: { prompt: { value: string } } }) => Promise<void>
    scribbleExists: boolean;
}

export default function CanvasPrompt({initialPrompt, onSubmit, scribbleExists,}: Props) {
    const [prompt, setPrompt] = useState(initialPrompt);

    const disabled = !(scribbleExists && prompt?.length > 0);

    useEffect(() => {
        setPrompt(initialPrompt);
    }, [initialPrompt]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setPrompt("");
        onSubmit(e);
        // clear the prompt
    };

    return (
        <form onSubmit={handleSubmit} className="animate-in fade-in duration-700">
            <div className="flex mt-2">
                <input
                    id="prompt-input"
                    type="text"
                    name="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the image you want to create..."
                    className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />

                <button
                    className={`flex-none rounded-md bg-pink-500 ml-3 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                        disabled ? "opacity-20 cursor-not-allowed	" : ""
                    }`}
                    type="submit"
                    disabled={disabled}
                >
                    Go
                </button>
            </div>
        </form>
    );
}

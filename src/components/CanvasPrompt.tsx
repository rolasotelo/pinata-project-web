import {useEffect, useState} from "react";

type Props = {
    initialPrompt: string;
    onSubmit: (     e: {preventDefault: () => void, target: {prompt: {value: string}}})=> Promise<void>
    scribbleExists: boolean;
}

export default function CanvasPrompt({initialPrompt, onSubmit, scribbleExists,}: Props) {
    const [prompt, setPrompt] = useState(initialPrompt);

    const disabled = !(scribbleExists && prompt?.length > 0);

    useEffect(() => {
        setPrompt(initialPrompt);
    }, [initialPrompt]);

    const handleSubmit = (e : any ) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <form onSubmit={handleSubmit} className="animate-in fade-in duration-700">
            <div className="flex mt-4">
                <input
                    id="prompt-input"
                    type="text"
                    name="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the image you want to create..."
                    className="block w-full flex-grow rounded-l-md text-black"
                />

                <button
                    className={`bg-black text-white rounded-r-md text-small inline-block px-5 py-3 flex-none ${
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

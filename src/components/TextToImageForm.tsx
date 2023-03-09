import {useForm , SubmitHandler} from "react-hook-form";

type Inputs = {
    prompt: string,
};

type Props = {
    onSubmit: (prompt: string) => void
}

export default function TextToImageForm(props: Props) {

    const {onSubmit} = props;

    const { register, handleSubmit, formState: { errors }, resetField } = useForm<Inputs>();
    const onSubmitForm: SubmitHandler<Inputs> = data => {

        // clean input from text
        resetField('prompt')
        onSubmit(data.prompt)
    }


    return (
        <div className="bg-gray-800 py-16 rounded-2xl">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
                <div className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:col-span-7">
                    <h2 className="inline sm:block lg:inline xl:block">What first comes to mind when you hear Mexico
                        🇲🇽?</h2>{' '}
                    <p className="inline sm:block lg:inline xl:block underline text-teal-500">¿ Qué sabes de México
                        ?</p>
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
                            {...register("prompt", { required: true})}

                        />
                        <button
                            type="submit"
                            className="flex-none rounded-md bg-pink-500 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Submit
                        </button>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-gray-300">
                       Look at your answers bellow!
                    </p>
                </form>
            </div>
        </div>
    )
}

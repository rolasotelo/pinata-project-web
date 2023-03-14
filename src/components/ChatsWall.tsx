import {ChatType} from "@/components/TextToTextForm";


type Props = {
    chats: ChatType[]
}
export default function ChatsWall({chats}: Props) {
    return (
        <div className="bg-gray-800 py-2 rounded-2xl">
            <div className="mx-auto max-w-7xl px-6 lg:px-6">
                <div
                    className="my-4 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-2">
                    {chats.map((chat) => {
                        return (<div className="flex flex-col bg-white p-2 rounded-2xl"><h1 className="text-2xl">{chat.prompt}</h1><br/><p key={chat.response}>{chat.response}</p></div>)
                    })}
                </div>
            </div>
        </div>
    )
}
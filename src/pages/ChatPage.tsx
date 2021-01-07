import React, { useEffect, useState } from "react"

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const wsChannel = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat = () => {
    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    )
}

const Messages = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChannel.addEventListener("message", (e) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])

    return (
        <div>
            {messages.map((m: ChatMessageType, index: number) => (
                <Message key={index} message={m} />
            ))}
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    return (
        <div>
            <img src={message.photo} alt="url" width={"50px"} /> <b>{message.userName}</b>
            <br />
            {message.message}
        </div>
    )
}

const AddMessageForm = () => {
    const [message, setMessage] = useState("")

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel.send(message)
        setMessage("")
    }

    return (
        <div>
            <div>
                <textarea
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    value={message}
                ></textarea>
            </div>
            <div>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage

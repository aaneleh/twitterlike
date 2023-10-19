import { useState, useEffect } from 'react'

export default function ResponsesCounter({post_id}) {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const [ responsesCounter, setResponsesCounter] = useState(0)

    const loadResponsesCounter = async() => {
        let json
        try {
            const res = await fetch(`${EXPRESS_URL}post/responses/${post_id}`)
            json = await res.json()
        } catch (err) {
            console.log("Erro carregando o numero de repostas: ", err)
        } finally {
            setResponsesCounter(json.length)
        }
    }

    useEffect(()=> {
        loadResponsesCounter()
    }, [])

    return (
        <>
            { responsesCounter }
        </>
    )
}
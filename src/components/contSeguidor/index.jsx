import { useState, useEffect } from 'react'

export default function ContSeguidor({seguidor_id, seguindo_id}) {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const [ quantSeguidor, setQuantSeguidor] = useState(false)

    const querySeguidor = async() => {
        try {
            const res = await fetch(`${EXPRESS_URL}seguidores/seguindo`, {
                method: 'POST',
                body: JSON.stringify({seguidor_id: seguidor_id, seguindo_id: seguindo_id}),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const json = await res.json()
            setQuantSeguidor(json.query.length)
        } catch (err){
            console.log(err)
            alert("Ocorreu um erro!")
        }
    }

    useEffect( () => {
        querySeguidor()
    }, [])

    return (
        <>
            { quantSeguidor }
        </>
    )
}
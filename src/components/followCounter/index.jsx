import { useState, useEffect } from 'react'

export default function FollowCounter({follower_id, following_id}) {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const [ followCount, setFollowCount] = useState(false)

    const queryFollows = async() => {
        try {
            const res = await fetch(`${EXPRESS_URL}follow/seguindo`, {
                method: 'POST',
                body: JSON.stringify({follower_id: follower_id, following_id: following_id}),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const json = await res.json()
            setFollowCount(json.query.length)
        } catch (err){
            console.log(err)
            alert("Ocorreu um erro!")
        }
    }

    useEffect( () => {
        queryFollows()
    }, [])

    return (
        <>
            { followCount }
        </>
    )
}
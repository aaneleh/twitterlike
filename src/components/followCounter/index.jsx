import { useState, useEffect } from 'react'

export default function FollowCounter({follower_id, following_id}) {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const [ followCount, setFollowCount] = useState(false)

    const queryFollows = async() => {
        let json
        try {
            const res = await fetch(`${EXPRESS_URL}follow/seguindo`, {
                method: 'POST',
                body: JSON.stringify({follower_id: follower_id, following_id: following_id}),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            json = await res.json()
        } catch (err){
            console.log(err)
            alert("Ocorreu um erro!")
        } finally {
            setFollowCount(json.length)
        }
    }

    useEffect( () => {
        queryFollows()
    }, [follower_id, following_id])

    return (
        <>
            { followCount }
        </>
    )
}
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function NotificationCard({user_id, post_id, date}) {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const [username, setUsername] = useState('')
    const [timeAgo, setTimeAgo ] = useState('')

    const loadTimeAgo = () => {
        const dateNotification = new Date(date)
        const currentDate = new Date()
        let timeDifference = Math.ceil( Math.abs(currentDate - dateNotification) / 1000)
        let timeText = "seg atrás"

        if(timeDifference >= 60) {
            timeDifference = Math.round(timeDifference / 60)
            timeText = "min atrás"

            if(timeDifference >= 60) {
                timeDifference = Math.floor(timeDifference / 60)
                timeText = "hr atrás"

                if(timeDifference >= 24) {
                    timeDifference = Math.floor(timeDifference / 24)
                    timeText = "dia atrás"
                    
                    if(timeDifference > 1)  timeText = "dias atrás"
        }}}
        setTimeAgo(timeDifference + " " + timeText)
    }

    const loadUsername = async(user_id) => {
        try {
            const res = await fetch(`${EXPRESS_URL}user/${user_id}`, {
                method: 'GET'
            })
            const json = await res.json()
            if(res.status == 200) {
                setUsername(json[0].username) 
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect( () => {
        loadUsername(user_id)
        loadTimeAgo()
    }, [])


    return (
        <div className="w-full flex flex-col items-center bg-slate-800 rounded m-2 p-4 py-10 ">
            <div className='w-full flex gap-2 justify-between items-center pb-2'>
                <p >
                    {
                        username == '' ? 
                                <span className='text-base truncate text-slate-400'> conta excluida </span>
                            :
                                <Link to={`/user/${ user_id }`} className='truncate'>
                                    <span className='text-lg underline'>{username}</span>
                                </Link>
                    }
                    { post_id == null ? 
                        <span> seguiu você</span>
                        :
                        <span> curtiu seu 
                            <Link className="underline ml-[0.5ch]" to={`/post/${post_id}`}>post</Link>
                        </span>
                    }   
                </p>
                <p className='text-slate-500 truncate'>
                    {timeAgo}
                </p>
            </div>
        </div>
    )
}
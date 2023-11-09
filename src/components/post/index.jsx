import { BsChatLeftFill, BsFillHeartFill, BsTrash3 } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useLogon } from '../../contexts/LogonContext'
import LikeButton from '../likeButton'
import ResponsesCounter from '../responsesCounter'


export default function Post({children, user_id, post_id, parent_post, date}) {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const [username, setUsername] = useState('')
    const { logonId } = useLogon()
    const [timeAgo, setTimeAgo ] = useState('')

    const loadTimeAgo = () => {
        const dateNotification = new Date(date)
        
        const currentDate = new Date()
        let timeDifference = Math.ceil( Math.abs(currentDate - dateNotification) / 1000)
        if(isNaN(timeDifference)) {
            setTimeAgo('')
            return
        }
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

    const deletes = async () => {
        try {
            const res = await fetch(`${EXPRESS_URL}post/${post_id}`, {
                method: 'DELETE'
            })
            refreshPage()
        } catch(err){
            console.log("Erro deletando o post: " + err)
        }
    }
    const loadUsername = async(user_id) => {
        try {
            const res = await fetch(`${EXPRESS_URL}user/${user_id}`, {
                method: 'GET'
            })
            if(res.status == 200) {
                const userdata = await res.json()
                setUsername(userdata[0].username) 
            }
        } catch (err) {
            console.log("Erro carregando o username: " + err)
        }
    }
    
    const refreshPage = () => {
        window.location.reload()
    }

    useEffect( () => {
        loadUsername(user_id)
        loadTimeAgo()
    }, [])


    return (
        <div className="flex flex-col items-center justify-center bg-slate-800 rounded w-full my-2">
            <div className='flex w-full gap-2 justify-between p-4 items-center border-b-[1px] '>
                <div className='flex gap-4 items-center'>
                    { 
                        username == '' ? 
                            <p className='text-base truncate text-slate-400'> conta excluida </p>
                        :
                            <Link to={`/user/${user_id}`} className='truncate'>
                                <p className='text-xl truncate'> {username} </p>
                            </Link>
                    }

                    {
                        parent_post != null ?
                            <Link className='underline' to={`/post/${parent_post}`}>
                                respondendo ao post
                            </Link>
                        : 
                            <></>
                    }
                    <p className='text-slate-500 text-sm'>  {timeAgo}  </p>
                </div>
                
                <div >
                    {
                        logonId == user_id ?
                            <span onClick={deletes}
                                className='text-xl pr-3 cursor-pointer text-red-600 hover:text-red-300'>
                                <BsTrash3/>
                            </span>
                        :
                            <p></p>
                    }
                </div>
            </div>
            <Link to={`/post/${post_id}`} className="w-full 
                rounded slate-950 text-slate-200 p-8 px-4">
                    {children}
            </Link>
            <div className='w-full flex justify-between px-8 pb-4'>
                <Link to={`/post/${post_id}`} className='flex items-center gap-4'>
                    <BsChatLeftFill  className='overflow-visible fill-none stroke-2 stroke-slate-200 cursor-pointer hover:fill-current'/>
                    <ResponsesCounter post_id={post_id}/>
                </Link>
                <LikeButton poster_id={user_id} post_id={post_id}/>
            </div>
        </div>
    )
}
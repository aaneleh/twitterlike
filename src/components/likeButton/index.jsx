import { BsFillHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useLogon } from '../../contexts/LogonContext'

export default function LikeButton({post_id}) {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const [ likesCounter, setLikesCounter] = useState(99)
    const [ isLiked, setLiked ] = useState(false)
    const { logonId } = useLogon()

    const like = async() => {
        try {
            const res = await fetch(`${EXPRESS_URL}like/`, {
                method: 'POST',
                body: JSON.stringify({ user_id: logonId, post_id: post_id, dateLiked: new Date() }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setLiked(true)
            setLikesCounter(likesCounter + 1)
        } catch (err) {
            console.log(err)
            alert("Erro!")
        }
    }
    
    const dislike = async () => {
        try {
            const res = await fetch(`${EXPRESS_URL}like/`, {
                method: 'DELETE',
                body: JSON.stringify({ user_id: logonId, post_id: post_id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setLiked(false)
            setLikesCounter(likesCounter - 1)
        } catch(err){
            console.log(err)
            alert("Erro!")
        }
    }
    
    const loadUsersLiked = async(post_id) => {
        try {

            const res = await fetch(`${EXPRESS_URL}like/${logonId}/${post_id}`, { 
                method: 'GET' 
            } )
            console.log(res)
            if(res.status == 200) {
                const usersliked = await res.json()
                setLikesCounter(usersliked.allUsers.length)
                setLiked(usersliked.thisUser)
            }
        } catch (err) {
            console.log(err)
            alert("Erro!")
        }
    } 

    useEffect( () => {
        loadUsersLiked(post_id)
    }, [])
    

    return (
        <div className='flex items-center gap-4'>
            {
                isLiked ? 
                    <BsFillHeartFill onClick={dislike} className='overflow-visible fill-current stroke-2 stroke-slate-200 cursor-pointer'/>
                :
                    <BsFillHeartFill onClick={like} className='overflow-visible fill-none stroke-2 stroke-slate-200 cursor-pointer hover:fill-current'/>
            }
            <span> { likesCounter } </span>
        </div>
    )
}
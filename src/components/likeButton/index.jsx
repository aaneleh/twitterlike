import { BsFillHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useLogon } from '../../contexts/LogonContext'

export default function LikeButton({poster_id, post_id}) {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const [ likesCounter, setLikesCounter] = useState(0)
    const [ isLiked, setLiked ] = useState(false)
    const { logonId } = useLogon()

    const like = async() => {
        try {
            const res = await fetch(`${EXPRESS_URL}like/`, {
                method: 'POST',
                body: JSON.stringify({ user_id: logonId, poster_id: poster_id, post_id: post_id, dateLiked: new Date() }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setLiked(true)
            setLikesCounter(likesCounter + 1)
        } catch (err) {
            console.log("Erro curtindo o post: ", err)
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
            console.log("Erro descurtindo o post: ", err)
        }
    }
    
    const loadUsersLiked = async(post_id) => {
        let usersliked
        try {
            const res = await fetch(`${EXPRESS_URL}like/${logonId}/${post_id}`)
            usersliked = await res.json()
        } catch (err) {
            console.log("Erro carregando as curtidas: ", err)
        } finally {
            setLikesCounter(usersliked.length)
            usersliked.map(value => {
                if(value.user_id === logonId) {
                    setLiked(true)
                }
            })
        }
    } 

    useEffect( () => {
        setLiked(false)
        loadUsersLiked(post_id)
    }, [post_id])

    return (
        <div className='flex items-center gap-4'>
            {
                isLiked ? 
                    <BsFillHeartFill onClick={dislike} className='overflow-visible fill-current stroke-2 stroke-slate-200 cursor-pointer'/>
                :
                    <BsFillHeartFill onClick={like} className='overflow-visible fill-none stroke-2 stroke-slate-200 cursor-pointer hover:fill-current'/>
            }
            <span> { likesCounter } </span>
            {/* @todo clicando na quantidade leva a lista de todos q curtiram */}
        </div>
    )
}
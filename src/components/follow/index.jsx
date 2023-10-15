import { useState, useEffect } from 'react'
import { useLogon } from '../../contexts/LogonContext'

export default function Follow({user_id}) {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const [ isFollowing, setFollowing] = useState(false)
    const { logonId } = useLogon()

    const loadIsFollowing = async() => {
        try {
            const res = await fetch(`${EXPRESS_URL}follow/seguindo`, {
                method: 'POST',
                body: JSON.stringify({follower_id: logonId, following_id: user_id}),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const json = await res.json()
            setFollowing(json.quant > 0)
        } catch (err){
            console.log(err)
            alert("Ocorreu um erro!")
        }
    }

    const follow = async() => {
        console.log('follow')

        try{
            const res = await fetch(`${EXPRESS_URL}follow/`, {
                method: 'POST',
                body: JSON.stringify({follower_id: logonId, following_id: user_id, dateFollow: new Date()}),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            console.log(res)
            if(res.status == 200)
                setFollowing(true)
        }catch(err){
            console.log(err)
            alert("Ocorreu um erro!")
        }
    }

    const unfollow = async() => {
        console.log('unfollow')
        try{
            const res = await fetch(`${EXPRESS_URL}follow/deixarseguir`, {
                method: 'DELETE',
                body: JSON.stringify({follower_id: logonId, following_id: user_id}),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            console.log(res)
            if(res.status == 200)
                setFollowing(false)
        }catch(err){
            console.log(err)
            alert("Ocorreu um erro!")
        }
    }

    useEffect( () => {
        loadIsFollowing()
    }, [])

    return (
        <>
            {
                isFollowing ? 
                    <span onClick={unfollow}
                    className='text-base text-center border-[1px] rounded p-[5px] hover:bg-slate-200 hover:text-slate-900 cursor-pointer'>
                        deixar de seguir
                    </span>
                :
                    <span onClick={follow}
                    className='text-base border-[1px] rounded p-[5px] bg-slate-200 text-slate-900 hover:bg-slate-900 hover:text-slate-200 cursor-pointer'>
                        seguir
                    </span>
            }
            
        </>
    )
}
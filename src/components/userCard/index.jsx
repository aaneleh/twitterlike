import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Follow from '../follow'
import ContSeguidor from '../contSeguidor'

export default function UserCard({user_id}) {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const [username, setUsername] = useState('')

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
            console.log(err)
            alert("error")
        }
    }

    useEffect( () => {
        loadUsername(user_id)
    }, [])


    return (
        <div className="flex flex-col items-center bg-slate-800 rounded w-64 lg:w-[32em] m-2 p-4 ">
            <div className='flex w-full gap-2 justify-between items-center pb-4 border-b-[1px] '>
                <Link to={`/user/${ user_id }`} className='truncate'>
                    <p className='text-xl truncate'> {username} </p>
                </Link>
                <Follow user_id={ user_id }/>
            </div>
            <div className='w-full flex flex-row justify-between align-center py-4 underline'>
                <Link to={`/user/${user_id}/seguindo`} > 
                    Seguindo <ContSeguidor seguidor_id={user_id} seguindo_id={null} />
                </Link> 
                <Link to={`/user/${user_id}/seguidores`} > 
                    Seguidores <ContSeguidor seguidor_id={null} seguindo_id={user_id} />
                </Link> 
            </div>
        </div>
    )
}
import { Link } from 'react-router-dom'
import { useLogon } from '../../contexts/LogonContext'
import { useState, useEffect } from 'react'
import Follow from '../follow'
import ContSeguidor from '../contSeguidor'

export default function UserCard({user_id}) {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const [username, setUsername] = useState('')
    const { logonId } = useLogon()

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
        console.log(logonId)
    }, [])


    return (
        <div className="w-full flex flex-col items-center bg-slate-800 rounded  m-2 p-4 ">
            <div className='w-full flex gap-2 justify-between items-center pb-2'>
                <Link to={`/user/${ user_id }`} className='truncate'>
                    <p className='text-xl truncate'> {username} </p>
                </Link>
                {
                    user_id == logonId ?
                        ""
                    :
                        <Follow user_id={ user_id }/>
                }
            </div>
            <div className='w-full flex flex-row justify-start gap-8 py-4 underline'>
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
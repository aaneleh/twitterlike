import { Link } from 'react-router-dom'
import { useLogon } from '../../contexts/LogonContext'
import { useState, useEffect } from 'react'
import Follow from '../follow'
import FollowCounter from '../followCounter'

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
                setUsername(userdata.length > 0 ? userdata[0].username : '') 
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
        <div className="w-full flex flex-col items-center bg-slate-800 rounded  m-2 p-4 ">
            {
                username == '' ?
                    <p className='text-base truncate text-slate-400 self-start'> conta excluida </p>
                :
                    <>
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
                            <Link to={`/user/${user_id}/following`} > 
                                Seguindo <FollowCounter follower_id={user_id} following_id={null} />
                            </Link> 
                            <Link to={`/user/${user_id}/followers`} > 
                                Seguidores <FollowCounter follower_id={null} following_id={user_id} />
                            </Link> 
                        </div>
                    </>
            }
        </div>
    )
}
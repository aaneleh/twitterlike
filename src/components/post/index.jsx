import { BsChatLeftFill, BsFillHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Post({children, user_id, post_id}) {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}user`
    const [username, setUsername] = useState("Teste")

    const seguir = (user_id) => {
        /* alert(`agora seguindo ${user}`) */
    }
    const curtir = (user_id) => {
        /* alert(`agora seguindo ${user}`) */
    }
    const loadUsername = async(user_id) => {
        try {
            const res = await fetch(`${EXPRESS_URL}/${user_id}`, {
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
        <div className="flex flex-col items-center bg-slate-800 rounded w-64 lg:w-[32em] m-2">
            <div className='flex w-full gap-2 justify-between p-4 items-center border-b-[1px] '>
                <Link to={`/user/${user_id}`} className='truncate'>
                    <p className='text-xl truncate'> {username} </p>
                </Link>
                <span onClick={seguir(user_id)} className='border-[1px] rounded p-[5px] hover:bg-slate-200 hover:text-slate-900 cursor-pointer'>seguir</span>
            </div>
            <p
                className="w-full
                rounded slate-950 text-slate-200 
                p-2 px-4  m-4 w-60 lg:w-[32em]">
                {children}
            </p>
            <div className='w-full flex justify-between px-8 pb-4'>
                <Link to={`/post/${post_id}`}>
                    <BsChatLeftFill  className='overflow-visible fill-none stroke-2 stroke-slate-200 cursor-pointer hover:fill-current'/>
                </Link>
                <BsFillHeartFill onClick={curtir(post_id)} className='overflow-visible fill-none stroke-2 stroke-slate-200 cursor-pointer hover:fill-current'/>
            </div>
        </div>
    )
}
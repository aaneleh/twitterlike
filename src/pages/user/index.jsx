import { BsGear, BsFillGearFill } from 'react-icons/bs'
import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { useLogon } from '../../contexts/LogonContext'
import Sidebar from '../../components/sidebar'
import Post from '../../components/post'
import Follow from '../../components/follow';
import FollowCounter from '../../components/followCounter'

export default function User() {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const { id } = useParams();
    const { checkLogin, logonId } = useLogon()
    const [ post, setPosts ] = useState([])
    const [ username, setUsername ] = useState([])

    const loadUsername = async (id) => {
        /* console.log(id) */
        try {
            const res = await fetch(`${EXPRESS_URL}user/${id}`, {
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
    const loadPosts = async (id) => {
        try {
            const res = await fetch(`${EXPRESS_URL}post/user/${id}`, {
                method: 'GET'
            })
            if(res.status == 200) setPosts(await res.json()) 
        } catch (err) {
            console.log(err)
            alert("error")
        }
    }

    useEffect( () => {
        checkLogin()
        loadPosts(id)
        loadUsername(id)
    }, [])

    useEffect( () => {
        checkLogin()
        loadPosts(id)
        loadUsername(id)
    }, [id, logonId])

    return (
        <div className="w-screen flex overflow-x-hidden">
            <aside className="w-16 md:w-[28em]">
                <Sidebar className='fixed left-0 top-0'/>
            </aside>
            <main className="w-full flex flex-col items-center pt-8">
                {
                    username == '' ?
                        <p> Esse usuário não existe mais</p>
                    :
                        <>
                            <div className='w-full border-b-2 border-slate-700 px-16'>
                                <div className="text-2xl h-16 flex justify-between w-full items-center pt-8 ">
                                    <h1>{username}</h1>
                                    { logonId == id ? 
                                        <Link to="/edit"> <BsFillGearFill/> </Link>
                                        : 
                                        <Follow user_id={id}/>
                                    }
                                </div>
                                <div className='flex justify-start gap-8 w-full items-center py-8 underline truncate'>
                                    <Link to={`/user/${id}/following`} className='truncate'> 
                                        Seguindo <FollowCounter follower_id={id} following_id={null} />
                                    </Link> 
                                    <Link to={`/user/${id}/followers`}  className='truncate'> 
                                        Seguidores <FollowCounter follower_id={null} following_id={id} />
                                    </Link> 
                                </div>
                            </div> 
                            <div className="py-8 w-full p-8">
                                {
                                    post.length == 0 ?
                                        <p className='text-center'>Nenhuma postagem para exibir</p> 
                                    :
                                        post.map( (value) => {
                                            return <Post key={value._id} user_id={value.user_id} post_id={value._id} parent_post={value.id_parent_post}>
                                                    {value.post}
                                                </Post>
                                            } )
                                }
                            </div>
                        </>
                }
            </main>
        </div>
    )

}
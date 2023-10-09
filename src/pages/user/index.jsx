import { BsGear, BsFillGearFill } from 'react-icons/bs'
import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { useLogon } from '../../contexts/LogonContext'
import Sidebar from '../../components/sidebar'
import Post from '../../components/post'

export default function User() {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const { id } = useParams();
    const { checkLogin, logonId } = useLogon()
    const [ post, setPosts ] = useState([])
    const [ username, setUsername ] = useState([])

    const loadUsername = async (id) => {
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
            const res = await fetch(`${EXPRESS_URL}posts/user/${id}`, {
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

    return (
        <div className="w-screen flex">
            <aside className="w-16 md:w-[18em]">
                <Sidebar className=' fixed left-0 top-0'/>
            </aside>
            <main className="w-full flex flex-col items-center">
                <div className="text-2xl h-24 flex justify-between w-full items-center p-16 border-b-2 border-slate-700">
                    <h1>{username}</h1>
                    { logonId == id ? 
                        <Link to="/edit"> <BsFillGearFill/> </Link>
                    : ""}
                </div>
                <div className="py-8">
                    {
                        post.length == 0 ?
                            <p>Nenhuma postagem para exibir</p> 
                        :
                            post.map( (value) => {
                                return <Post key={value._id} user_id={value.user_id} post_id={value._id}>
                                        {value.post}
                                    </Post>
                                } )
                    }
                </div>
            </main>
        </div>
    )

}
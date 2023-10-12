import { useEffect, useState } from "react";
import { useLogon } from '../../contexts/LogonContext'
import Sidebar from "../../components/sidebar";
import Write from "../../components/write";
import Post from '../../components/post'

export default function Home() {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const { checkLogin } = useLogon()
    const [ post, setPosts ] = useState([])

    const loadPosts = async () => {
        try {
            const res = await fetch(`${EXPRESS_URL}posts/`, {
                method: 'GET'
            })
            if(res.status == 200) setPosts(await res.json()) 
        } catch (err) {
            console.log(err)
            alert("error")
        }
    }

    useEffect(() => {
        checkLogin()
        loadPosts()
    }, [])

    return (
        <div className="w-screen flex">
            <aside className="w-16 md:w-[18em]">
                <Sidebar className=' fixed left-0 top-0'/>
            </aside>
            <main className="w-full flex flex-col items-center">
                <div className="w-full pt-4 px-8">
                    <Write/>
                </div>
                <div className="pt-2 w-full px-8">
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
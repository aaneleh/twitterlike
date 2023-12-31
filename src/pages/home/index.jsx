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
            const res = await fetch(`${EXPRESS_URL}post/`, {
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
        <div className="w-screen flex bg-slate-900">
            <aside className="w-16 md:w-[28em] ">
                <Sidebar className='fixed left-0 top-0'/>
            </aside>
            <main className="w-full flex flex-col items-center ">
                <div className="w-full pt-16 px-8">
                    <Write parent_post={null}/>
                </div>
                <div className="pt-2 w-full px-8 ">
                    {
                    post.length == 0 ?
                        <p></p> 
                        :
                        post.map( (value) => {
                            return <Post key={value._id} user_id={value.user_id} post_id={value._id} parent_post={value.id_parent_post} date={value.datePosted}>
                                    {value.post}
                                </Post>
                        } )
                    }
                </div>
                
            </main>
        </div>
    )
}
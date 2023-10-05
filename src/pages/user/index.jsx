import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useLogon } from '../../contexts/LogonContext'
import Sidebar from '../../components/sidebar'
import Write from '../../components/write'
import Post from "../../components/post";



export default function User() {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}posts/user`
    const { id } = useParams();
    const {  checkLogin } = useLogon()
    const [ post, setPosts ] = useState([])

    const loadPosts = async () => {
        try {
            const res = await fetch(`${EXPRESS_URL}/${id}`, {
                method: 'GET'
            })

            if(res.status == 200) setPosts(await res.json()) 
                else setPosts("Esse usuario nem tem posts ainda") 
        } catch (err) {
            console.log(err)
            alert("error")
        }
    }

    useEffect( () => {
        checkLogin()
        
        loadPosts()
    }, [])

    return (
        <div className="w-screen flex">
            <aside className="w-16 md:w-[18em]">
                <Sidebar className=' fixed left-0 top-0'/>
            </aside>
            <main className="w-full flex flex-col items-center">
                <Write/>

                {post.map( (value) => {
                    console.log(value)

                    return <Post key={value._id} user_id={value.user_id} post_id={value._id}>
                        {value.post}
                    </Post>

                } )}

            </main>
        </div>
    )

}
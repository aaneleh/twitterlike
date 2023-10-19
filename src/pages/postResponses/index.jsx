import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useLogon } from '../../contexts/LogonContext'
import Sidebar from '../../components/sidebar'
import Post from '../../components/post'
import Write from '../../components/write'

export default function PostResponses() {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const { post_id } = useParams();
    const { checkLogin } = useLogon()
    const [ mainPost, setMainPost ] = useState({
        _id: '',
        user_id: '',
        post: '',
        datePosted: ''
    })
    const [ responses, setResponses ] = useState([])

    const loadPosts = async () => {
        let postDate
        try {
            const res = await fetch(`${EXPRESS_URL}post/${post_id}`, {
                method: 'GET'
            })
            postDate = await res.json()
        } catch (err) {
            console.log("Erro carregando o post: ", err)
        } finally {
            setMainPost(postDate)
        }
    }

    const loadResponses = async() => {
        let json;
        try {
            const res = await fetch(`${EXPRESS_URL}post/responses/${post_id}`)
/*             console.log(await res) */
            json = await res.json()
            
        } catch (err) {
            console.log("Erro carregando respostas: ", err)
        } finally {
/*             console.log(json) */
            setResponses(json)
        }
    }

    useEffect( () => {
        checkLogin()
        loadPosts()
        loadResponses()
        console.log(mainPost)
    }, [post_id])

/*     useEffect( () => {
        console.log(responses) 
    }, [responses]) */

    return (
        <div className="w-screen flex">
            <aside className="w-16 md:w-[18em]">
                <Sidebar className=' fixed left-0 top-0'/>
            </aside>
            <main className="w-full flex flex-col items-center">
                <div className='w-full p-16'>
                    <div>
                        <Post user_id={mainPost.user_id} post_id={mainPost._id} parent_post={mainPost.id_parent_post}>
                            {mainPost.post} 
                        </Post>
                    </div>
                    <div className="border-l-[2px] border-slate-500 w-full pl-16 mt-8 pt-4">
                        <div className="pb-8">
                            <Write parent_post={mainPost._id}/>
                        </div>
                        <div>
                            {  
                                responses.length > 0 ?
                                    responses.map((value) => {
                                        return <Post key={value._id} user_id={value.user_id} post_id={value._id} className="py-8" parent_post={null}>
                                            {value.post}
                                        </Post>
                                    })
                                :
                                    <p className="pb-8">
                                        Nenhuma resposta ainda
                                    </p>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )

}
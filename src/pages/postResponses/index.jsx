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
        let postData
        try {
            const res = await fetch(`${EXPRESS_URL}post/${post_id}`, {
                method: 'GET'
            })
            postData = await res.json()
        } catch (err) {
            console.log("Erro carregando o post: ", err)
        } finally {
            setMainPost(postData)
        }
    }

    const loadResponses = async() => {
        let json;
        try {
            const res = await fetch(`${EXPRESS_URL}post/responses/${post_id}`)
            json = await res.json()
        } catch (err) {
            console.log("Erro carregando respostas: ", err)
        } finally {
            setResponses(json)
        }
    }

    useEffect( () => {
        checkLogin()
        loadPosts()
        loadResponses()
    }, [post_id])

    return (
        <div className="w-screen flex">
            <aside className="w-16 md:w-[28em]">
                <Sidebar className='fixed left-0 top-0'/>
            </aside>
            <main className="w-full flex flex-col items-center">
                <div className='w-full p-16'>
                    <div>
                        {
                            mainPost == null ?
                                <div> Esse post foi excluído! {console.log(mainPost)} </div>
                            :
                                <Post user_id={mainPost.user_id} post_id={mainPost._id} parent_post={mainPost.id_parent_post} date={mainPost.datePosted}>
                                    {mainPost.post} 
                                </Post>
                        }
                    </div>
                    <div className="border-l-[2px] border-slate-500 w-full pl-16 mt-8 pt-4">
                        <div className="pb-8 select-none">
                            {
                                mainPost == null ?
                                    <></>
                                :
                                    <Write parent_post={null} />
                            }
                        </div>
                        <div>
                            {  
                                responses.length > 0 ?
                                    responses.map((value) => {
                                        return <Post className="py-8" key={value._id} user_id={value.user_id} post_id={value._id} parent_post={null} date={value.datePosted}>
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
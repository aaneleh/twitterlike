import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useLogon } from '../../contexts/LogonContext'
import Sidebar from '../../components/sidebar'
import Post from '../../components/post'

export default function Search() {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const { checkLogin } = useLogon()
    const [ search, setSearch ] = useState('')
    const [ users, setUsers ] = useState([])
    const [ posts, setPosts ] = useState([])

    useEffect(() => {
        checkLogin()
    }, [])

    useEffect(() => {
        setSearch(search)
    }, [search])

    const handleInputChange = (e) => {
        setSearch(e.target.value)
    }

    const searchUsers = async(search) => {
        if(search == '') return
        try {
            const res = await fetch(`${EXPRESS_URL}user/search/${search}`, {
                method: 'GET'
            })
            if(res.status == 200) setUsers(await res.json()) 
        } catch (err) {
            console.log(err)
            alert("error")
        }
    }

    const searchPosts = async(search) => {
        if(search == '') return
        try {
            const res = await fetch(`${EXPRESS_URL}posts/search/${search}`, {
                method: 'GET'
            })
            if(res.status == 200) setPosts(await res.json()) 
        } catch (err) {
            console.log(err)
            alert("error")
        }
    }

    const loadSearch = () => {
        searchUsers(search)
        searchPosts(search)
        console.log(users)
        console.log(posts)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="w-screen flex">
            <aside className="w-16 md:w-[18em]">
                <Sidebar className="fixed left-0 top-0"/>
            </aside>
            <main className="w-full flex flex-col items-center ">
                <form onSubmit={handleSubmit} className='flex items-center gap-8 p-8'>
                    <input onChange={handleInputChange} type="text" name="search" className='h-8 w-64 outline-none rounded border-2 border-slate-200 bg-transparent p-2'/>
                    <button onClick={loadSearch}> <BsSearch className='text-2xl'/> </button>
                </form>
                {
                    search != '' ?
                    <>
                        <section className="w-full flex flex-col items-center p-8 border-t-2 border-slate-700 ">
                            <h1 className='self-start text-lg'>Usuário</h1>
                            <div className='flex flex-col justify-start w-full text-left p-8 gap-8'>
                                {
                                    search != '' && users.length == 0 ?
                                        <p>Nenhum usuário encontrado</p> 
                                    :
                                    users.map( (value) => {

                                        /* FAZER UM COMPONENTE "UserCard" SEPARADO */
                                        return <div key={value._id} >
                                            <Link to={`/user/${value._id}`} >
                                                <h3 className='underline'> {value.username} </h3>
                                            </Link>
                                        </div> 
                                    } )
                                }
                            </div>
                        </section>
                        <section className="w-full flex flex-col items-center p-8 border-t-2 border-slate-700 ">
                            <h1 className='self-start text-lg'>Postagens</h1>
                            <div>
                                {
                                    posts.length == 0 ?
                                        <p>Nenhuma postagem encontrada</p> 
                                    :
                                        posts.map( (value) => {
                                            return <Post key={value._id} user_id={value.user_id} post_id={value._id}>
                                                    {value.post}
                                                </Post>
                                            } )
                                        }
                            </div>
                        </section>
                    </>
                : <></>
                }
                
            </main>
        </div>
    )

}
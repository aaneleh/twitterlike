import { BsArrowLeft } from 'react-icons/bs'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar'
import UserCard from '../../components/userCard'

export default function LikesList() {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const navigate = useNavigate();
    const { post_id } = useParams();
    const [ users, setUsers ] = useState([])

    const loadUsers = async (id) => {
        let json
        try {
            const res = await fetch(`${EXPRESS_URL}like/${id}`)
            json = await res.json()
        } catch (err) {
            console.log(err)
            alert("error")
        } finally {
            console.log(json)
            setUsers(json)
        }
    }

    useEffect( () => {
        loadUsers(post_id)
    }, [post_id]) 

    return (
        <div className="w-screen flex">
            <aside className="w-16 md:w-[18em]">
                <Sidebar className=' fixed left-0 top-0'/>
            </aside>
            <main className="w-full flex flex-col items-center ">
                <div className='p-8 w-full'>
                    <div className='flex text-xl items-center justify-start w-full pb-8 gap-16 border-b-[1px]'>
                        <button onClick={() => navigate(-1)}>
                            <BsArrowLeft className='text-2xl'/>
                        </button>
                        Curtidas
                    </div>
                </div>
                <div className="pt-2 w-full p-8">
                    {
                        users.length == 0 ?
                            <p>Ninguem curtiu esse post ainda</p>
                        :
                        users.map( (value) => {
                            return <UserCard key={value.user_id} user_id={ value.user_id}/>
                        }) 
                    }
                </div>
            </main>
        </div>
    )

}
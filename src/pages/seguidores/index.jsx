import { BsArrowLeft } from 'react-icons/bs'
import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../../components/sidebar'
import UserCard from '../../components/userCard'

export default function Seguidores() {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const { id } = useParams();
    const [ seguidores, setSeguidores ] = useState([])

    const loadSeguidores = async (id) => {
        try {
            const res = await fetch(`${EXPRESS_URL}seguidores/seguindo`, {
                method: 'POST',
                body: JSON.stringify({seguidor_id: null, seguindo_id: id}),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const json = await res.json()
            if(res.status == 200) setSeguidores(json.query) 
        } catch (err) {
            console.log(err)
            alert("error")
        }
    }

    useEffect( () => {
        loadSeguidores(id)
    }, [])

    return (
        <div className="w-screen flex">
            <aside className="w-16 md:w-[18em]">
                <Sidebar className=' fixed left-0 top-0'/>
            </aside>
            <main className="w-full flex flex-col items-center ">
                <div className='p-8 w-full'>
                    <div className='flex text-xl items-center justify-start w-full pb-8 gap-16 border-b-[1px]'>
                        <Link to={`/user/${id}`}>
                            <BsArrowLeft className='text-2xl'/>
                        </Link>
                        Seguidores
                    </div>
                </div>
                <div className="pt-2 w-full p-8">
                    {
                        seguidores.length == 0 ?
                        <p>Não tem nenhum seguidor</p>
                        :
                        seguidores.map( (value) => {
                            return <UserCard key={value._id} user_id={ value.seguidor_id}/>
                        })
                    }
                </div>
            </main>
        </div>
    )

}
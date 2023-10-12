import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Notificacao({user_id, post_id, data}) {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const [username, setUsername] = useState('')
    const [date, setDate ] = useState('')

    const loadData = () => {
        const dataNotificacao = new Date(data)
        const dataAtual = new Date()
        let diferenca = Math.ceil((dataAtual - dataNotificacao) / 1000)
        let texto = "seg atrás"

        if(diferenca >= 60) {
            diferenca = Math.round(diferenca / 60)
            texto = "min atrás"

            if(diferenca >= 60) {
                diferenca = Math.floor(diferenca / 60)
                texto = "hr atrás"

                if(diferenca >= 24) {
                    diferenca = Math.floor(diferenca / 24)
                    texto = "dia atrás"
                    if(diferenca > 1)  texto = "dias atrás"
        }}}
        setDate(diferenca + texto)
    }

    const loadUsername = async(user_id) => {
        try {
            const res = await fetch(`${EXPRESS_URL}user/${user_id}`, {
                method: 'GET'
            })
            const json = await res.json()
            if(res.status == 200) {
                setUsername(json[0].username) 
            }
        } catch (err) {
            console.log(err)
            alert("error")
        }
    }

    useEffect( () => {
        loadUsername(user_id)
        loadData()
    }, [])


    return (
        <div className="w-full flex flex-col items-center bg-slate-800 rounded m-2 p-4 py-10 ">
            <div className='w-full flex gap-2 justify-between items-center pb-2'>
                <p>
                    <Link to={`/user/${ user_id }`} className='truncate'>
                        <span className='text-lg underline'>{username}</span>
                    </Link>
                    { post_id == null ? 
                        <span> seguiu você</span>
                        :
                        <span>curtiu seu 
                            <Link to={`/post/${post_id}`}>post</Link>
                        </span>
                    }   
                </p>
                <p className='text-slate-500'>
                    {date}
                </p>
            </div>
        </div>
    )
}
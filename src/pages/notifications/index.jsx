import { useEffect, useState } from "react";
import { useLogon } from '../../contexts/LogonContext'
import Sidebar from '../../components/sidebar'
import Notificacao from "../../components/notificacao";

export default function Notifications() {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const { checkLogin, logonId } = useLogon()
    const [ notifications, setNotifications ] = useState([])

    const loadNotifications = async() => {
        try {
            const res = await fetch(`${EXPRESS_URL}seguidores/seguindo`, {
                method: 'POST',
                body: JSON.stringify({ seguidor_id: null, seguindo_id: logonId}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await res.json()
            console.log(json.query)
            if(res.status == 200) setNotifications(json.query)
        } catch(err){
            console.log(err)
            alert("Erro")
        }
    }

    useEffect(() => {
        checkLogin()
        loadNotifications()
    }, [])

    return (
        <div className="w-screen flex">
            <aside className="w-16 md:w-[18em]">
                <Sidebar className=' fixed left-0 top-0'/>
            </aside>
            <main className="w-full flex flex-col items-center p-8">
                {
                    notifications.length <= 0 ?
                        <p>Nenhuma notificação</p>
                    :
                        notifications.map( (value) => {
                            return <Notificacao key={value._id} user_id={value.seguidor_id} post_id={null} data={value.dataRealizada}/>
                        })
                }
            </main>
        </div>
    )

}
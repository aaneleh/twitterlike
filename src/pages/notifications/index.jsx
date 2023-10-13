import { useEffect, useState } from "react"
import { useLogon } from '../../contexts/LogonContext'
import Sidebar from '../../components/sidebar'
import NotificationCard from "../../components/notificationCard"

export default function Notifications() {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const { checkLogin, logonId } = useLogon()
    const [ notifications, setNotifications ] = useState([])

    const loadNotifications = async() => {
        try {
            const res = await fetch(`${EXPRESS_URL}follow/seguindo`, {
                method: 'POST',
                body: JSON.stringify({ follower_id: null, following_id: logonId}),
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
            <div className='p-8 w-full border-b-[1px]'>
                Notificações
            </div>
            <div className="pt-8 w-full p-8">
                {
                    notifications.length <= 0 ?
                        <p>Nenhuma notificação</p>
                    :
                        notifications.map( (value) => {

                            return <NotificationCard key={value._id} user_id={value.follower_id} post_id={null} data={value.dateFollow}/>
                        })
                }
            </div>
            </main>
        </div>
    )

}
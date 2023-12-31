import { useEffect, useState } from "react"
import { useLogon } from '../../contexts/LogonContext'
import Sidebar from '../../components/sidebar'
import NotificationCard from "../../components/notificationCard"

export default function Notifications() {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const { checkLogin, logonId } = useLogon()
    const [ notifications, setNotifications ] = useState([])

    const loadFollows = async() => {
        let follows, likes
        try {
            const resFollows = await fetch(`${EXPRESS_URL}follow/seguindo`, {
                method: 'POST',
                body: JSON.stringify({ follower_id: null, following_id: logonId}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const resLikes = await fetch(`${EXPRESS_URL}like/poster/${logonId}`, { 
                method: 'GET'
            } )
            
            follows = await resFollows.json()
            likes = await resLikes.json() 
        } catch(err){
            console.log("Erro carregando as notificacoes: ", err)
        } finally {
            
            let sortedNotifications = []
            let notf
            let l = 0, f = 0

            while(follows.length > f || likes.length > l){             
                
                if(likes.length > 0 && (follows.length == 0 || follows.length == f || (new Date(follows[f].dateFollow) - new Date(likes[l].dateLiked) < 0) )) {
                    //push like
                    notf = {
                        _id: likes[l]._id,
                        user_id: likes[l].user_id,
                        post_id: likes[l].post_id,
                        date: likes[l].dateLiked
                    }
                    sortedNotifications.push(notf)
                    l ++
                }
                if(follows.length > 0 && ( likes.length == 0 || likes.length == l || (new Date(follows[f].dateFollow) - new Date(likes[l].dateLiked) > 0) )){
                    //push follow
                    notf = {
                        _id: follows[f]._id,
                        user_id: follows[f].follower_id,
                        post_id: null,
                        date: follows[f].dateFollow
                    }
                    sortedNotifications.push(notf)
                    f++
                }
            }
            setNotifications(sortedNotifications)
        }
    }

    useEffect(() => {
        setNotifications([])
        checkLogin()
        loadFollows()
    }, [])

    return (
        <div className="w-screen flex">
            <aside className="w-16 md:w-[28em]">
                <Sidebar className='fixed left-0 top-0'/>
            </aside>
            <main className="w-full flex flex-col items-center p-8">
                <div className='p-8 w-full border-b-[1px] text-xl'>
                    Notificações
                </div>
                <div className="pt-8 w-full p-0 md:p-8">
                    {
                        notifications.length <= 0 ?
                            <p>Nenhuma notificação</p>
                        :
                            notifications.map( (value) => {
                                return <NotificationCard key={value._id} user_id={value.user_id} post_id={value.post_id} date={value.date}/>
                            })
                    }
                </div>
            </main>
        </div>
    )

}
import { useEffect, useState } from "react"
import { useLogon } from '../../contexts/LogonContext'
import Sidebar from '../../components/sidebar'
import NotificationCard from "../../components/notificationCard"

export default function Notifications() {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}`
    const { checkLogin, logonId } = useLogon()
    const [ notifications, setNotifications ] = useState([])
    //dai nos likes fazer um loop e ir colocando por data, sendo q ñ precisa organizar follow por follow nem like por like, só entre follow e like

    const loadFollows = async() => {
        try {
            const res = await fetch(`${EXPRESS_URL}follow/seguindo`, {
                method: 'POST',
                body: JSON.stringify({ follower_id: null, following_id: logonId}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const follows = await res.json()
            
            follows.query.map( (value) => {
                setNotifications(prev => [ 
                    ...prev, {
                        _id: value._id,
                        user_id: value.follower_id,
                        post_id: null,
                        date: value.dateFollow
                    }
                ])
            })
        } catch(err){
            console.log(err)
            alert("Erro")
        }
    }

    const loadLikes = async() => {
        try {
            const res = await fetch(`${EXPRESS_URL}like/${logonId}`, { 
                method: 'GET'
            } )
            const likes = await res.json() 

            likes.map( (value) => {
                setNotifications(prev => [ 
                    ...prev, {
                        _id: value._id,
                        user_id: value.user_id,
                        post_id: value.post_id,
                        date: value.dateLiked
                    }
                ])
            })

            /* likes.forEach( ( like ) => 
                notifications.forEach( (notf) => {
                    if(notf.date - like.dateLiked > 0) //se der um numero positivo é porque a data do like é mais antiga
                        setNotifications(prev => [ 
                            {
                                _id: like._id,
                                user_id: like.user_id,
                                post_id: like.post_id,
                                date: like.dateLiked
                            }, prev
                        ])
                    
                    else 
                        setNotifications(prev => [ 
                            ...prev, {
                                _id: like._id,
                                user_id: like.user_id,
                                post_id: like.post_id,
                                date: like.dateLiked
                            }
                        ])
                    
                }  )  
            ) */

        } catch (err) {
            console.log(err)
            alert("Erro!")
        }
    }

    useEffect(() => {
        setNotifications([])
        checkLogin()
        loadLikes()
        loadFollows()
    }, [])

    return (
        <div className="w-screen flex">
            <aside className="w-16 md:w-[18em]">
                <Sidebar className=' fixed left-0 top-0'/>
            </aside>
            <main className="w-full flex flex-col items-center p-8">
                <div className='p-8 w-full border-b-[1px] text-xl'>
                    Notificações
                </div>
                <div className="pt-8 w-full p-8">
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
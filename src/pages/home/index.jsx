import { Link, Navigate }  from "react-router-dom";
import { useEffect } from "react";
import { useLogon } from '../../contexts/LogonContext'
import Login from '../login'
import Sidebar from "../../components/sidebar";

export default function Home() {
    const { logonId, login, logoff } = useLogon()

    useEffect(() => {
        const LocalId = localStorage.getItem('logonId')
        if(LocalId) login(LocalId)
    }, [])

    console.log(logonId == null ? `Faça login! ${ logonId}` : `Bem-vindo de volta ${ logonId } `)

    return (
        <div>
            {logonId == null ? 
                <Navigate to="/login" replace={true} />
                :
            <div>
                <aside className="bg-blue-600">
                    <Sidebar />
                </aside>
                <main>
                    <h2>Bem-vindo de volta, {logonId} </h2>
                </main>
            </div>
            }
        </div>
        
    )
}
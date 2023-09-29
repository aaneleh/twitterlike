import { useEffect } from "react";
import { useLogon } from '../../contexts/LogonContext'
import Sidebar from "../../components/sidebar";
import Write from "../../components/write";

export default function Home() {
    const { logonUsername, checkLogin } = useLogon()

    useEffect(() => {
        checkLogin()
    }, [])

    return (
        <div>
            <aside className="w-16 fixed left-0 top-0">
                <Sidebar />
            </aside>
            <main className="ml-16">
                <h2>Bem-vindo de volta, { logonUsername } </h2>
                <Write/>
            </main>
        </div>
    )
}
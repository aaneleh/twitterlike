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
        <div className="w-screen flex">
            <aside className="w-16 md:w-[18em]">
                <Sidebar className=' fixed left-0 top-0'/>
            </aside>
            <main className="w-full overflow-y-scroll">
                <h2 className="text-center">Bem-vindo de volta, { logonUsername } </h2>
                <Write/>
            </main>
        </div>
    )
}
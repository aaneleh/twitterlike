import { useEffect } from "react";
import { useLogon } from '../../contexts/LogonContext'
import Sidebar from '../../components/sidebar'

export default function Search() {

    const {  checkLogin } = useLogon()

    useEffect(() => {
        checkLogin()
    }, [])

    return (
        <div>
            <aside className="w-16 fixed left-0 top-0">
                <Sidebar />
            </aside>
            <main className="ml-16">

            </main>
        </div>
    )

}
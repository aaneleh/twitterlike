import { Link }  from "react-router-dom";

import { useLogon } from '../../contexts/LogonContext'


export default function Main() {
    const { logonId } = useLogon()

    console.log(logonId == null ? `Faça login! ${ logonId}` : `Bem-vindo de volta ${ logonId } `)

    return (
        <div>
            <div>
                <Link to="/login">Login</Link>
            </div>
            <div>
                <Link to="/register">Cadastro</Link>
            </div>
        </div>
    )
}
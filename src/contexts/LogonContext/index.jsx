import { useContext, createContext, useState, useEffect } from 'react'
import { useNavigate  }  from "react-router-dom";

const logonContext = createContext({})

export function useLogon(){
    return useContext(logonContext)
}

export function LogonProvider({children}) {
    const navigate = useNavigate();
    const [logonId, setLogonId] = useState( null )
    const [logonUsername, setLogonUsername] = useState( null )

    function login(id, username) {
        setLogonUsername(username)
        setLogonId(id)
        localStorage.setItem("username", username)
        localStorage.setItem("logonId", id) 
    }

    function logoff(){
        setLogonId(null)
        localStorage.removeItem("logonId")
        localStorage.removeItem("username")
        navigate('/login')
    }

    function checkLogin(){
        const LocalId = localStorage.getItem("logonId")
        const LocalUser = localStorage.getItem("username")
        if(LocalId) login(LocalId, LocalUser) 
        else navigate('/login')
    }

    return(
        <logonContext.Provider value={ { logonId, logonUsername, login, logoff, checkLogin } }>
            { children }
        </logonContext.Provider>
    )

}
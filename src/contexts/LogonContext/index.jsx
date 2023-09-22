import { useContext, createContext, useState, useEffect } from 'react'

const logonContext = createContext({})

export function useLogon(){
    return useContext(logonContext)
}

export function LogonProvider({children}) {
    
    const [logonId, setLogonId] = useState( null )

    function login(id) {
        setLogonId(id)
        localStorage.setItem("logonId", id)
    }

    function logoff(){
        setLogonId(null)
        localStorage.removeItem("logonId");
    }

    return(
        <logonContext.Provider value={ { logonId, login, logoff } }>
            { children }
        </logonContext.Provider>
    )

}
import { useContext, createContext, useState, useEffect } from 'react'

const logonContext = createContext({})

export function useLogon(){
    return useContext(logonContext)
}

export function LogonProvider({children}) {

    //ve se tem algo no local storage
    
    const [logonId, setLogonId] = useState( null )

    function login(id) {
        setLogonId(id)
        //salva no local storage também
    }

    function logoff(){
        setLogonId(null)
        //limpa o local storage também
    }

    return(
        <logonContext.Provider value={ { logonId, login, logoff } }>
            { children }
        </logonContext.Provider>
    )

}
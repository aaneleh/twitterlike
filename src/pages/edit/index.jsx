import { useNavigate }  from "react-router-dom";
import { useState, useEffect } from 'react'
import { useLogon } from '../../contexts/LogonContext'
import Sidebar from "../../components/sidebar"

export default function Edit() {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}user`
    const navigate = useNavigate();

    const { checkLogin, logonId } = useLogon()
    const [ formValid, setFormValid ] = useState(false)
    const [ formData, setFormData ] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const handleInputChange = (e) => {
        setFormData((original) => {
            return {
                ...original,
                [e.target.name]: e.target.value
            }
        })
    }

    const loadInfo = async() => {
        if(!logonId) return
        try{
            const res = await fetch(`${EXPRESS_URL}/${logonId}`, {
                method: 'GET' 
            })
            if(res.status == 200) {
                const json = await res.json()
                setFormData({
                    username: json[0].username,
                    email: json[0].email,
                    password: json[0].password,
                    passwordConfirm: json[0].password
                })
            }
        } catch(err){
            console.log(err)
            alert("Erro!")
        }
    }

    const edit = async() => {
        if(!logonId) return
        console.log(JSON.stringify(formData))
        try {
            const res = await fetch(`${EXPRESS_URL}/${logonId}`, {
                method: 'PATCH',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            navigate(-1)
        } catch(err){
            console.log(err)
            alert(err)
        }
    }

    const deletes = async() => {
        if(!logonId) return
        try {
            const res = await fetch(EXPRESS_URL, {
                method: 'DELETE',
                body: JSON.stringify({id_user: logonId}),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            console.log(res)
            navigate(-1)
        } catch(err){
            console.log(err)
            alert(err)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
    }

    useEffect(() => {
        if( formData.username.length > 4 &&
            formData.password.length > 4 &&
            formData.passwordConfirm == formData.password 
        )  setFormValid(true)
        else {
            setFormValid(false)
        }
    }, [formData, formValid])

    useEffect(() => {
        checkLogin()
        loadInfo()
    }, [])


    return (
        <div className="w-screen flex">
            <aside className="w-16 md:w-[18em]">
                <Sidebar className=' fixed left-0 top-0'/>
            </aside>
            <main className="w-full flex flex-col items-center">
                <form onSubmit={handleSubmit}>
                    <div>
                        <h1>Editando seu perfil</h1>
                    </div>
                    <div>
                        <label htmlFor="username">Username: </label>
                        <input className="text-slate-900"
                            onChange={handleInputChange} value={formData.username} type="text" id="username" name="username"  />
                    </div>
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input className="text-slate-900"
                            onChange={handleInputChange} value={formData.email} type="text" id="email" name="email"  disabled={true}/>
                    </div>
                    <div>
                        <label htmlFor="password">password: </label>
                        <input className="text-slate-900"
                            onChange={handleInputChange} value={formData.password} type="password" id="password" name="password"  />
                    </div>
                    <div>
                        <label htmlFor="passwordConfirm">Confirme a password: </label>
                        <input className="text-slate-900"
                            onChange={handleInputChange} value={formData.passwordConfirm} type="password" id="passwordConfirm" name="passwordConfirm"  />
                    </div>
                    <div>
                        <button className="text-red-500" onClick={() => navigate(-1)}>Cancelar</button>
                        <button className={`border-2 border-current p-2 rounded ${formValid ? "cursor-pointer" : "cursor-not-allowed"}`} onClick={edit} disabled={formValid ? false : true}>Salvar alterações</button>
                    </div>
                </form>
                <button onClick={deletes}>Excluir conta</button>
            </main>
        </div>
    )
}
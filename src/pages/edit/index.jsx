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
        if(confirm("Você tem certeza que deseja excluir sua conta? Essa ação não será reversível"))
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
                <Sidebar className='fixed left-0 top-0'/>
            </aside>
            <main className="w-full flex flex-col items-center p-8">
                <div className='p-8 w-full border-b-[1px] text-xl'>
                    Editando seu perfil
                </div>
                <form onSubmit={handleSubmit} className="p-8 w-full grid grid-cols-1 grid-rows-6 gap-4">
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label htmlFor="username">Username: </label>
                        <input className="sm:col-start-2 col-start-3 col-end-5 bg-transparent border-b-[1px] pb-[2px] outline-none transition-all focus:border-b-[3px] focus:pb-0"
                            onChange={handleInputChange} value={formData.username} type="text" id="username" name="username"  />
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label htmlFor="email">Email: </label>
                        <input className="text-slate-400 sm:col-start-2 col-start-3 col-end-5 bg-transparent border-b-[1px] pb-[2px] outline-none transition-all focus:border-b-[3px] focus:pb-0"
                            onChange={handleInputChange} value={formData.email} type="text" id="email" name="email"  disabled={true}/>
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label htmlFor="password">Senha: </label>
                        <input className="sm:col-start-2 col-start-3 col-end-5 bg-transparent border-b-[1px] pb-[2px] outline-none transition-all focus:border-b-[3px] focus:pb-0"
                            onChange={handleInputChange} value={formData.password} type="password" id="password" name="password"  />
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label htmlFor="passwordConfirm" className="truncate">Confirme a senha: </label>
                        <input className="sm:col-start-2 col-start-3 col-end-5 bg-transparent border-b-[1px] pb-[2px] outline-none transition-all focus:border-b-[3px] focus:pb-0"
                            onChange={handleInputChange} value={formData.passwordConfirm} type="password" id="passwordConfirm" name="passwordConfirm"  />
                    </div>
                    <div className="flex justify-center gap-4 items-center pt-8">
                        <button className="text-red-500" onClick={() => navigate(-1)}>Cancelar</button>
                        <button className={`border-2 border-current p-2 rounded ${formValid ? "cursor-pointer" : "cursor-not-allowed"}`} onClick={edit} disabled={formValid ? false : true}>Salvar alterações</button>
                    </div>
                </form>
                <div className="underline h-full flex flex-col justify-end">
                    <button onClick={deletes}>Excluir conta</button>
                </div>
            </main>
        </div>
    )
}
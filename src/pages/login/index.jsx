import { Link, useNavigate }  from "react-router-dom";
import { useState, useEffect } from 'react'
import { useLogon } from '../../contexts/LogonContext'

export default function Login() {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}user/login`
    const navigate = useNavigate();
    const { login } = useLogon()
    const [ formValid, setFormValid ] = useState(false)
    const [ formData, setFormData ] = useState({
        email: '',
        senha: '',
    })
    
    useEffect(() => {
            if(formData.email.includes("@") &&
                formData.senha.length > 4 
            )  setFormValid(true)
            else {
                setFormValid(false)
            }
        }, [formData, formValid]
    )

    const handleInputChange = (e) => {
        setFormData((original) => {
            return {
                ...original,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const res = await fetch(EXPRESS_URL, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            let json = await res.json()
            login(await json.id, await json.username)

            if(res.status == 200) navigate('/')
                else alert("Login inválido!") 
        } catch (err) {
            console.log(err)
            alert("error")
        }
    }

    return (
        <div className="
        w-screen h-full sm:p-0 rounded-none
        lg:w-4/5 lg:h-full lg:p-24 lg:m-24 lg:rounded-3xl
        dark:bg-slate-950 bg-slate-200 
        flex flex-row justify-around items-center">
            <form onSubmit={handleSubmit}
            className="w-screen p-32 grid grid-cols-1 grid-rows-6 gap-4 items-start">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold">Entrar</h1>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <label>Email</label>
                    <input onChange={handleInputChange} className="col-start-2 col-end-5
                    pb-0 transition-all focus:pb-2
                    outline-none bg-transparent 
                    border-slate-400 dark:border-slate-500 border-solid border-b-2" 
                    type="text" name="email"/>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <label>Senha</label>
                    <input onChange={handleInputChange} className="col-start-2 col-end-5
                    pb-0 transition-all focus:pb-2
                    outline-none bg-transparent 
                    border-slate-400 dark:border-slate-500 border-solid border-b-2" 
                    type="password" name="senha"/>
                </div>
                <div className="flex justify-center">
                    <input className= {`dark:bg-slate-950 dark:text-slate-200 bg-slate-200 text-slate-950
                    transition-all hover:bg-slate-950 hover:text-slate-200 dark:hover:bg-slate-200 dark:hover:text-slate-950
                    border-solid border-2 border-slate-700 dark:border-slate-200
                    w-full pt-4 pb-4 pt-2 rounded-3xl ${formValid ? "cursor-pointer" : "cursor-not-allowed" }`}
                    type="submit" name="submit" title={!formValid ? "Preencha todos os campos corretamente" : null} value="Entrar" disabled={!formValid}/>
                </div>
                <div className="flex justify-center">
                    <Link to="/register" className="underline font-light text-sm">Não possui conta? Cadastre-se aqui</Link>
                </div>
            </form>
        </div>
    )
}
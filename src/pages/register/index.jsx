import { Link, useNavigate }  from "react-router-dom";
import { useState, useEffect } from 'react'

export default function Register() {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}/usuarios`
    const navigate = useNavigate();
    const [ formValid, setFormValid ] = useState(false)
    const [ formData, setFormData ] = useState({
        username: '',
        email: '',
        senha: '',
        senhaconf: ''
    })
    
    useEffect(() => {
            if(formData.email.includes("@") &&
                formData.username.length > 4 &&
                formData.senha.length > 4 &&
                formData.senhaconf == formData.senha 
            )  setFormValid(true)
            else {
                setFormValid(false)
            }
            /* console.log(formData,formValid) */
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
        alert("submit feito")
        try {
            const res = await fetch(EXPRESS_URL, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if(res.status == 200) navigate('/')
                else alert("erro!") 
        } catch (err) {
            console.log(err)
            alert("error")
        }
    }

    return (
        <div className="
        w-full h-full sm:p-0 rounded-none
        lg:w-4/5 lg:h-full lg:p-24 lg:m-24 lg:rounded-3xl
        dark:bg-slate-950 bg-slate-200 
        flex flex-row justify-center items-center">
            <form onSubmit={handleSubmit}
            className="grid grid-cols-1 grid-rows-6 gap-4 items-start">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold">Bem-vindo</h1>
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
                    <label>Usuário</label>
                    <input onChange={handleInputChange} className="col-start-2 col-end-5
                    pb-0 transition-all focus:pb-2
                    outline-none bg-transparent 
                    border-slate-400 dark:border-slate-500 border-solid border-b-2" 
                    type="text" name="username"/>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <p>Senha</p>
                    <input onChange={handleInputChange} className="col-start-2 col-end-5
                    pb-0 transition-all focus:pb-2
                    outline-none bg-transparent 
                    border-slate-400 dark:border-slate-500 border-solid border-b-2" 
                    type="password" name="senha"/>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <p> Confirme Senha </p>
                    <input onChange={handleInputChange} className="col-start-2 col-end-5
                    pb-0 transition-all focus:pb-2
                    outline-none bg-transparent 
                    border-slate-400 dark:border-slate-500 border-solid border-b-2" 
                    type="password" name="senhaconf"/>
                </div>
                <div className="flex justify-center">
                    <input className= {`dark:bg-slate-950 dark:text-slate-200 bg-slate-200 text-slate-950
                    transition-all hover:bg-slate-950 hover:text-slate-200 dark:hover:bg-slate-200 dark:hover:text-slate-950
                    border-solid border-2 border-slate-700 dark:border-slate-200
                    w-full pt-4 pb-4 pt-2 rounded-3xl ${formValid ? "cursor-pointer" : "cursor-not-allowed" }`}
                    type="submit" name="submit" title={!formValid ? "Preencha todos os campos corretamente" : null} value="Criar conta" disabled={!formValid}/>
                </div>
                <div className="flex justify-center">
                    <Link to="/login" className="underline font-light text-sm">Já possuo conta</Link>
                </div>
            </form>
        </div>
    )
}
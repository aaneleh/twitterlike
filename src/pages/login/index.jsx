import { Link }  from "react-router-dom";

export default function Login() {
    return (
        <div className="p-24 w-4/5 h-full
        dark:bg-slate-950 bg-slate-200 rounded-3xl
        flex flex-row justify-center items-center">
            <form className="grid grid-cols-1 grid-rows-5 gap-4 items-start">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold">Entrar</h1>
                </div>
                <div className="grid grid-cols-4 col-gap-0">
                    <label>Nome</label>
                    <input className="col-start-2 col-end-5
                    pb-0 transition-all focus:pb-2
                    outline-none bg-transparent 
                    border-slate-400 dark:border-slate-500 border-solid border-b-2" 
                    type="text" name="username"/>
                </div>
                <div className="grid grid-cols-4 col-gap-0">
                    <p>Senha</p>
                    <input className="col-start-2 col-end-5
                    pb-0 transition-all focus:pb-2
                    outline-none bg-transparent 
                    border-slate-400 dark:border-slate-500 border-solid border-b-2" 
                    type="password" name="password"/>
                </div>
                <div className="flex justify-center">
                    <input className="dark:bg-slate-950 dark:text-slate-200 bg-slate-200 text-slate-950
                    transition-all hover:bg-slate-950 hover:text-slate-200 dark:hover:bg-slate-200 dark:hover:text-slate-950
                    border-solid border-2 border-slate-700 dark:border-slate-200
                    w-full pt-4 pb-4 pt-2 rounded-3xl cursor-pointer"
                    type="submit" name="" value="Entrar"/>
                </div>
                <div className="flex justify-center">
                    <Link to="/register" className="underline font-light text-sm">Não possui conta? Cadastre-se aqui</Link>
                </div>
            </form>
        </div>
    )
}
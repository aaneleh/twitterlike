import { BsHouse, BsPersonCircle, BsBell, BsSearch, BsPlusCircleFill, BsBoxArrowInRight, BsBoxArrowRight } from 'react-icons/bs'
import { useLogon } from '../../contexts/LogonContext'
import { Link } from 'react-router-dom'

export default function Sidebar() {

    const { logoff, logonId, logonUsername } = useLogon()

    return (
        <div className='h-screen p-8 pt-16 flex flex-col items-center gap-16 text-4xl
            w-16 md:w-[8em] md:items-start
            overflow-hidden
            border-r-2 border-slate-950 dark:border-slate-500'>
            <Link to="/" 
                className='p-2 rounded-full transition duration-200	
                md:grid grid-cols-3 items-center gap-8
                hover:bg-slate-950 hover:text-slate-200
                dark:hover:bg-slate-200 dark:hover:text-slate-950'>
                <BsHouse/>
                <p className='text-base invisible absolute col-span-2 md:visible md:relative truncate'>Principal</p> 
            </Link>
            <Link to={`/user/${logonId}`} 
                className='p-2 rounded-full transition duration-200	
                md:grid grid-cols-3 items-center gap-8
                hover:bg-slate-950 hover:text-slate-200
                dark:hover:bg-slate-200 dark:hover:text-slate-950'>
                <BsPersonCircle/>
                <p className='text-base invisible absolute col-span-2 md:visible md:relative truncate'> {logonUsername} </p> 
            </Link>
            <Link to="/notifications"
                className='p-2 rounded-full transition duration-200
                md:grid grid-cols-3 items-center gap-8 
                hover:bg-slate-950 hover:text-slate-200
                dark:hover:bg-slate-200 dark:hover:text-slate-950'>
                <BsBell/>
                <p className='text-base invisible absolute col-span-2 md:visible md:relative truncate'>Notificações</p> 
            </Link>

{/*             <div 
                className='p-2 rounded-full cursor-pointer hover:scale-125 transition
                md:grid grid-cols-3 items-center gap-8' >
                <BsPlusCircleFill/>
                <p className='text-base invisible absolute col-span-2 md:visible md:relative truncate'>Postar Tweet</p> 
            </div>   */}

            <Link to="/search" 
                className='p-2 rounded-full transition duration-200
                md:grid grid-cols-3 items-center gap-8 
                hover:bg-slate-950 hover:text-slate-200
                dark:hover:bg-slate-200 dark:hover:text-slate-950'>
                <BsSearch/>
                <p className='text-base invisible absolute col-span-2 md:visible md:relative truncate'>Pesquisar</p> 
            </Link>

            <div 
                className='text-red-500 cursor-pointer 
                p-2 rounded-full transition duration-200
                md:grid grid-cols-3 items-center gap-8 
                hover:bg-slate-950 hover:text-red-500
                dark:hover:bg-red-500 dark:hover:text-slate-950' onClick={logoff}>
                <BsBoxArrowRight />
                <p className='text-base invisible absolute col-span-2 md:visible md:relative truncate'>Sair</p> 
            </div>
        </div>
    )
}
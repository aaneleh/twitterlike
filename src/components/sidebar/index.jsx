import { BsHouse, BsPersonCircle, BsBell, BsSearch, BsBoxArrowRight, BsPlusCircleFill, BsX, BsXLg } from 'react-icons/bs'
import { useLogon } from '../../contexts/LogonContext'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Write from "../../components/write"

export default function Sidebar() {

    const { logoff, logonId, logonUsername } = useLogon()
    const [ dialog, setDialog] = useState(false)

    return (
        <>
            <div className='h-screen p-8 pt-16 flex flex-col items-center gap-16 text-4xl
                w-16 md:w-[8em] md:items-start
                overflow-hidden
                fixed
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

                <div 
                    className='cursor-pointer p-2 rounded-full transition duration-200
                    md:grid grid-cols-3 items-center gap-8 
                    hover:bg-slate-950 hover:text-slate-200
                    dark:hover:bg-slate-200 dark:hover:text-slate-950'
                    onClick={() => setDialog(!dialog)}>
                    <BsPlusCircleFill/> 
                    <p className='text-base invisible absolute col-span-2 md:visible md:relative truncate'>Postar Tweet</p> 
                </div>  

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
            <div className={`z-10 fixed top-0 left-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                p-8 lg:w-[50em] h-[30em] w-10/12 
                rounded bg-slate-800 shadow-xl shadow-inner border-2 border-slate-900
                transition-transform ease-in-out
                ${dialog ? 'scale-100' : 'scale-0'}
                `}>
                <div className='w-full h-1/4 flex flex-row-reverse '>
                    <BsXLg onClick={() => setDialog(false)} className='cursor-pointer'/>
                </div>
                <Write parent_post={null}/>
            </div>
        </>
    )
}
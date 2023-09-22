import { BsPersonCircle, BsBell, BsSearch, BsPlusCircleFill, BsBoxArrowInRight, BsBoxArrowRight } from 'react-icons/bs'
import { useLogon } from '../../contexts/LogonContext'
import { Link } from 'react-router-dom'

export default function Sidebar() {

    const { logoff } = useLogon()

    return (
        <div className='w-16 h-screen p-6 flex flex-col items-center gap-8 text-4xl'>
            <Link to="user">
                <BsPersonCircle/>
            </Link>
            <Link to="notifications">
                <BsBell/>
            </Link>

            <BsPlusCircleFill/>

            <Link to="search">
                <BsSearch/>
            </Link>

            <BsBoxArrowRight className='cursor-pointer text-red-500' onClick={logoff}/>
        </div>
    )

}
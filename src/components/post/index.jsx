import { BsChatLeftFill, BsFillHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function Post({children, user_id, post_id}) {

    const seguir = (user_id) => {
        /* alert(`agora seguindo ${user}`) */
    }
    const comentar = (user_id) => {
        /* alert(`agora seguindo ${user}`) */
    }
    const curtir = (user_id) => {
        /* alert(`agora seguindo ${user}`) */
    }

    return (
        <div className="flex flex-col items-center bg-slate-800 rounded w-64 lg:w-[32em] m-2">
            <div className='flex w-full gap-2 justify-between p-4 items-center border-b-[1px] '>
                <Link to={`/user/${user_id}`} className='truncate'>
                    <p className='text-xl truncate'>{user_id}</p>
                </Link>
                <span onClick={seguir(user_id)} className='border-[1px] rounded p-[5px] hover:bg-slate-200 hover:text-slate-900 cursor-pointer'>seguir</span>
            </div>
            <p
                className="w-full
                rounded slate-950 text-slate-200 
                p-2 px-4  m-4 w-60 lg:w-[32em]">
                {children}
            </p>
            <div className='w-full flex justify-between px-8 pb-4'>
                <Link to={`/post/${post_id}`}>
                    <BsChatLeftFill  className='overflow-visible fill-none stroke-2 stroke-slate-200 cursor-pointer hover:fill-current'/>
                </Link>
                <BsFillHeartFill onClick={curtir(post_id)} className='overflow-visible fill-none stroke-2 stroke-slate-200 cursor-pointer hover:fill-current'/>
            </div>
        </div>
    )
}
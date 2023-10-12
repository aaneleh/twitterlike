import { useState, useEffect } from 'react'
import { BsSend } from 'react-icons/bs'

export default function Write() {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}post`
    const [ postValid, setPostValid ] = useState(false)
    const [ post, setPost ] = useState('')
    
    useEffect(() => {
            if(post.length > 0
            )  setPostValid(true)
            else {
                setPostValid(false)
            }
        }, [post, postValid]
    )

    const handleInputChange = (e) => {
        setPost(e.target.value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const res = await fetch(EXPRESS_URL, {
                method: 'POST',
                body: JSON.stringify({
                    'user_id': localStorage.getItem('logonId'),
                    'post': post,
                    'datePosted': new Date()
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(res.status == 200) refreshPage()
            else alert("Erro!")

        } catch (err) {
            console.log(err)
            alert("Erro!")
        }
    }
    const refreshPage = () => {
        window.location.reload()
    }
    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center relative pb-4">

                <textarea className="w-full h-36 bg-transparent border-2 rounded slate-950 text-slate-200 p-2
                    resize-none active:outine-none "
                    onChange={handleInputChange} name="post"  placeholder="Lorem Ipsum..." >
                </textarea>
                <button onClick={handleSubmit} disabled={!postValid}
                    className={`absolute right-[-15px] bottom-0
                    bg-slate-200 rounded-full text-slate-950 p-2 pt-3 pr-3 text-2xl
                    border-2 hover:bg-slate-900 hover:text-slate-200 transition duration-125 col-start-2
                    ${postValid ? "cursor-pointer" : "cursor-not-allowed" }`}>
                    <BsSend/>
                </button>

        </form>
    )
}
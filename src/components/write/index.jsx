import { useState, useEffect } from 'react'

export default function Write() {
    const EXPRESS_URL = `${import.meta.env.VITE_EXPRESS_URL}posts`
    const [ tweetValid, setTweetValid ] = useState(false)
    const [ tweet, setTweet ] = useState('')
    
    useEffect(() => {
            if(tweet.length > 0
            )  setTweetValid(true)
            else {
                setTweetValid(false)
            }
            console.log(tweet)
        }, [tweet, tweetValid]
    )

    const handleInputChange = (e) => {
        setTweet(e.target.value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        alert(`Enviando tweet: ${tweet}`)
        try {
            const res = await fetch(EXPRESS_URL, {
                method: 'POST',
                body: JSON.stringify({
                    'id': localStorage.getItem('logonId'),
                    'post': tweet
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

/*             console.log(await res) */
            if(res.status == 200) alert ("Tweet feito com sucesso")
            else alert("Tweet não pôde ser feito")

        } catch (err) {
            console.log(err)
            alert("Tweet não pôde ser feito")
        }
    }

    return (
        <div className="">
            <form onSubmit={handleSubmit} className="">
                <div className="">
                    <textarea className="bg-transparent border-2 rounded slate-950 text-slate-200 p-2 resize-none active:outine-none lg:w-[32em]"
                    onChange={handleInputChange} name="tweet" cols="35" rows="5" placeholder="Lorem Ipsum..." >
                    </textarea>
                </div>
                <div className="flex justify-end">
                    <input className= 
                        {`bg-slate-200 rounded-full text-slate-950 py-2 px-4 border-2 
                        hover:bg-slate-900 hover:text-slate-200 transition duration-125
                        ${tweetValid ? "cursor-pointer" : "cursor-not-allowed" }`}
                    type="submit" name="submit" value="Postar" disabled={!tweetValid}/>
                </div>
            </form>
        </div>
    )
}
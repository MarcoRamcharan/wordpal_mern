import {useState} from 'react'
import axios from 'axios'
import Result from '../components/Result'
import {useNavigate} from 'react-router-dom'
import '../css/userhome.css'
import { useAuthContext } from "../hooks/useAuthContext"



function UserHome() {

    const {user} = useAuthContext()

    const navigate = useNavigate()

    const [word, setWord] = useState('')
    const [response ,setResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [saveWordMessage, setSaveWordMessage] = useState(null)
    
 




    const searchWord = async (e) =>{
        e.preventDefault()
        try{
            setLoading(true)
            const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            setResponse(res.data)
            setError(null)
            console.log(res.data)
            console.log(word)
        }catch(error){
            setError(true)
        }
        finally{
            setLoading(false)
        }
    }

    const saveWord = async (e) =>{
        e.preventDefault()
        if(!response){
            setSaveWordMessage('cant save a word that doesnt exist')
        }
        if(response){
              const res = await fetch('https://wordpal.herokuapp.com/api/word/add', {
              method: 'POST',
              headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${user.token}`
            },
              body: JSON.stringify({word})
            })
            const json = await res.json()
        
            if (!res.ok) {
                setSaveWordMessage(json.error)
                console.log(json.error)
            }
            if (res.ok) {
              console.log(json, 'new word added')
              setSaveWordMessage('word saved')
              navigate('/user/words')
            }
            if(!response){
                alert('cant save a word that doesnt exists')
            }
        }
        }

  return (
    <div className='userHome'>
        <div className='searchWord'>
            <h1>search a word</h1>
            <div className='input-group'>
                <input 
                onFocus={() => {setResponse(null) ; setError(null); setSaveWordMessage(null)}} 
                type="text" placeholder='enter a word' 
                value={word} 
                onChange={(e) => setWord(e.target.value)}
                />
                <button onClick={searchWord}>search</button>
            </div>
            </div>
            <div className="saveWord">
                <button onClick={saveWord}>save word</button>
                {saveWordMessage && ( <h5 className='saveWordMessage'>{saveWordMessage}</h5>) }
            </div>


            <div className="responseDiv">
            {!loading && !error && !response &&( 
             <div className="default">
                <h1>LOOK UP A WORD</h1>
             </div>
            )}

            {loading && ( <h1 className='loading'>...loading</h1> )}

            {error && ( <h1 className='error'>no defintions for {word}</h1>) }

            { response && (
                <Result response={response} word={word}/>
            )}
            </div>
    </div>
  )
}

export default UserHome

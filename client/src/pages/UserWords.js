import {useState, useEffect, useCallback} from 'react'
import Result from '../components/Result'
import '../css/userwords.css'
import { useAuthContext } from "../hooks/useAuthContext"


const UserWords = () => {

  const {user} = useAuthContext()



  const [words, setWords] = useState(null)
  const [loading, setLoading] = useState(false)
  const [singleLoading, setSingleLoading] = useState(false)
  const [error, setError] = useState(false)
  const [singleword, setSingleWord] = useState(null) 


  const getWords = useCallback(async () =>{
    try{
      setLoading(true)
        const res = await fetch('https://wordpal.herokuapp.com/api/word',{
          method: 'GET',
          headers: {'Authorization': `Bearer ${user.token}`},
      })
        const json = await res.json()
        setWords(json)
        setError(false)
    }catch(error){
        console.log(error)
        setError(true)
}
finally{
  setLoading(false)
}
}
,[user]) 

useEffect(()=>{
  getWords()
},[getWords])   

 const handleClick = async (word) =>{
    try{
      setSingleLoading(true)
      console.log(singleLoading)
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {method: 'GET'})
    const json = await res.json()
    setSingleWord(json)
    console.log(singleword)
  }catch(error){
    console.log(error)
  }finally{
    setSingleLoading(false)
  }
}

const deleteWord = async (e, id) =>{
  e.preventDefault()
  try{
    const res = await fetch(`https://wordpal.herokuapp.com/api/word/${id}`, {
      method: 'DELETE',
      headers:{
        'Authorization' : `Bearer ${user.token}`
      }
    })
    const json = await res.json() 
    console.log(json, 'deleted word')
    getWords()
  }catch(error){
    console.log(error)
  }
}
 

  if(error){
    return (
    <div className='userWordError'>
      <h1>SORRY WE HAVE AN ERROR</h1>
    </div>
    )
  }


  if(loading){
    return (
      <div className='userWordLoading'>
      <h1>LOADING</h1>
    </div>
    )
  }

  if(words && words.length === 0){
    return (
    <div className='noWords'>
      <h1>NO WORDS SAVED</h1>
    </div>
    )
  }


  return ( 
    <div className='userWords'>
      <div className="wordslist">
      {words && words.map((word) => {
          return (
            <div style={{border: '1px solid black', padding: '20px', margin: '20px', backgroundColor: 'white'}} key={word._id}>
              <h1 onClick={() => {handleClick(word.word)}}>{word.word}</h1>
              <button onClick={(e) => {deleteWord(e, word._id)}}>delete</button>
            </div>
          )
        })
      }
    </div>
    <Result response={singleword} word="word" />
    </div>
   );
}

 
export default UserWords;
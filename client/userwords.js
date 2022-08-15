import {useEffect, useState} from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import axios from 'axios'

function UserWords() {

  const {user} = useAuthContext()

  const [words, setWords] = useState(null)
  const [meanings, setMeanings] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchWords = async () => {
      const res = await fetch('/api/words', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await res.json()

      if (res.ok) {
        setWords(json)
        console.log(words)
      }
    }
    fetchWords()
  },[])

  const getWordData = async (word) =>{
    try{
        setLoading(true)
        console.log(loading)
        const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        setMeanings(res.data)
        setError(null)
        console.log(res.data)
    }catch(error){
        setError(true)
        console.log(error)
    }
    finally{
        setLoading(false)
    }
  }

  return (
    <div>
        <div className='left'>
        {!words && (
            <h1>You Have No Words</h1>
        )}
        {words && (
            words.map( word => {
                <h1 onClick={()=>{getWordData(word)}}>{word}</h1>
            })
        )}
        </div>
        <div className='right'>
        {!meanings && (
            <h1>no word chosen</h1>
        )}
        {meanings && (
                <div className="meanings">
                <h1>word : {meanings[0].word}</h1>
                <h1>part os speech : {meanings[0].meanings[0].partOfSpeech}</h1>
              {/* audio---------------------------- */}
              {meanings[0] && word && category === "en" && (
                <div>
                <h1>audio : </h1>
                <audio
                  style={{ backgroundColor: '#fff', borderRadius: 10 }}
                  src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
                  controls
                >
                  Your browser does not support the audio element.
                </audio>
                </div>
              )}
              {/* audio---------------------------- */}
        
              {word === "" ? (
                <span className="subTitle">Start by typing a word in search</span>
              ) : (
                <div>
                  <h1>definitions</h1>
                {meanings.map(val => val.meanings.map(means => means.definitions.map(def => (
                  <div key={def.definition}>
                    <li>{def.definition}</li>
                  </div>
                ))))}
                <h1>examples</h1>
                  {meanings.map(val => val.meanings.map(means => means.definitions.map(def => (
                        <div key={def.example}>
                          {def.example ? <li>{def.example}</li> : ''}
                        </div>
                      ))))}
              </div>
              )}
            </div>
        )}
        </div>
    </div>
  )
}

export default UserWords

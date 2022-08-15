const WordandPos = ({meanings}) => {
    return ( 
        <div className="wordAndPos">
            <h1>WORD : {meanings[0].word}</h1>
            <h1>PART OF SPEECH : {meanings[0].meanings[0].partOfSpeech}</h1>
      </div>
     );
}
 
export default WordandPos;
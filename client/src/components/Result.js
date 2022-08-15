import WordandPos from "./WordandPos"
import Audio from "./Audio"
import Definitions from "./Definitions"
import Examples from "./Examples"
import '../css/resultstyles.css'

function Result({response, word}) {
  return (
    <>
        {
            response && word &&(
                <div className="result">
                  <WordandPos meanings={response}/>
                  <Audio meanings={response}/>
                  <Definitions meanings={response}/>
                  <Examples meanings={response}/>
                </div>
            )
        }
    </>
  )
}

export default Result

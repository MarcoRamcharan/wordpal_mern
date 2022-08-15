import {Link} from 'react-router-dom'
import '../css/firstpage.css'

function Firstpage() {
  return (
    <>
    <div className='firstpage'>
        <div className='banner'>
            <h1>WORDPAL.</h1>
            <p>app for the poet</p>
            <p>Best online dictionary</p>
        </div>
        <div className='links'>
            <Link to='/login'>LOGIN</Link>
            <Link to='/signup'>SIGNUP</Link>
        </div>
    </div>
    </>
  )
}

export default Firstpage

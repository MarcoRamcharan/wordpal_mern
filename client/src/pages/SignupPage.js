import '../css/signuppage.css'
import {useState} from 'react'
import { useSignup } from '../hooks/useSignup'


function SignupPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  


    const {signup, error, isLoading} = useSignup()

    const signupUser = async (e) => {
        e.preventDefault()
        await signup(email,password)
    }


  return (
    <div className="signuppage">
        <div className='banner'>
            <h1>WORDPAL.</h1>
            <p>Signup to the worlds best wordapp</p>
        </div>
        <div className='signup'>
            <form onSubmit={signupUser}>
                <div className="input-group">
                    <h2>EMAIL</h2>
                    <input type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="input-group">
                    <h2>PASSWORD</h2>
                    <input type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                     />
                    <button disabled={isLoading}>SIGNUP</button>
                    {error && <h1 style={{border: '1px solid blue', padding: '5px'}}>{error}</h1>}
                </div>

            </form>
        </div>
    </div>
  )
}

export default SignupPage

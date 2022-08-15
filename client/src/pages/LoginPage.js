import '../css/loginpage.css'
import {useState} from 'react'
import {useLogin} from '../hooks/useLogin'


function LoginPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {login, error, isLoading} = useLogin()

  const loginUser = async (e) => {
      e.preventDefault()
      await login(email,password)
  }

  return (
    <div className="loginpage">
        <div className='banner'>
            <h1>WORDPAL.</h1>
            <p>Login and view your dashboard</p>
        </div>
        <div className='login'>
            <form onSubmit={loginUser}>
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
                    <button disabled={isLoading}>LOGIN</button>
                    {error && <h1 style={{border: '1px solid blue', padding: '5px'}}>{error}</h1>}
                </div>

            </form>
        </div>
    </div>
  )
}

export default LoginPage

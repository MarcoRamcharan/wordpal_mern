import FirstPage from './pages/FirstPage'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserHome from './pages/UserHome'
import UserWords from './pages/UserWords'
import UserLayout from './layouts/UserLayout';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

function App() {

  const {user} = useAuthContext()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={user ? <Navigate to='/user'/> : <FirstPage/>}></Route>
          <Route path='/login' element={user ? <Navigate to='/user'/> : <LoginPage/>}></Route>
          <Route path='/signup' element={user ? <Navigate to='/user'/> : <SignupPage/>}></Route>
          <Route path = '/user/' element={user ? <UserLayout/> : <Navigate to='/'/>}>
            <Route index element={<UserHome/>}/>
            <Route path='words' element={user ? <UserWords/> : <Navigate to='/'/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import React, { useEffect } from 'react'
import './App.css';
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, login, logout } from './features/counterSlice'
import Imassage from './components/Imessage/Imassage';
import Login from './components/Login/Login';
import { auth } from './firebase';


const App = () => {

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout())
      }
    })
  }, [])

  return (
    // BEM naming conventions
    <div className='app'>
      {user ? <Imassage /> : <Login />}
    </div>
  )
}

export default App

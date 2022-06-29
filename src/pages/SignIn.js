import React,{useContext} from 'react'
import { AuthContext } from '../context/AuthContextProvider'

const SignIn = () => {
  const {user,signInWithGoogle,logOut}=useContext(AuthContext)

  console.log(user)

  return (
    <div>
      {
        user && 
        <div>
          <h1 style={{color:'green'}}>{user && user.displayName}</h1>
          <img src={user.photoURL} alt="avatar" />
        </div>
      }
      <button style={{fontSize:'3rem',cursor:'pointer'}} onClick={()=>signInWithGoogle()}>sign in</button>
      <br/>
      <button style={{fontSize:'3rem',cursor:'pointer'}} onClick={()=>logOut()}>log out</button>
    </div>
    
  )
}

export default SignIn
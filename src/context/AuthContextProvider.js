import React,{useState,useEffect} from 'react'
import auth from '../firebase'
import { useNavigate } from 'react-router-dom'
import {
  onAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { replace } from 'formik'

export const AuthContext=React.createContext()

const AuthContextProvider = ({children}) => {
  const navigate=useNavigate()
  const [user,setUser]=useState(false)
  const [loading,setLoading]=useState(true)

  const signInWithGoogle=()=>{
    return signInWithRedirect(auth,new GoogleAuthProvider())
  }

  const loginWithEmailAndPassword=(email,password)=>{
    console.log(email,password)
    return signInWithEmailAndPassword(auth,email,password)
  }

  const logOut=()=>{
    return signOut(auth)
  }

  useEffect(()=>{
    onAuthStateChanged(auth,user=>{
      setUser(user)
      setLoading(false)
    })
    if(user) navigate(-1,{ replace: true })
  },[user])


  const value={
    user,
    signInWithGoogle,
    loginWithEmailAndPassword,
    logOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
import React,{useState,useEffect} from 'react'
import auth from '../firebase'
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

export const AuthContext=React.createContext()

const AuthContextProvider = ({children}) => {
  const [user,setUser]=useState(false)
  const [loading,setLoading]=useState(true)

  const signInWithGoogle=()=>{
    return signInWithRedirect(auth, new GoogleAuthProvider())
  }

  const createNewUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithEmailAndPassword=(email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  
  const setUsername = (username) => {
    return updateProfile(user, {
      displayName:username
    });
  };

  const logOut=()=>{
    return signOut(auth)
  }

  useEffect(()=>{
    onAuthStateChanged(auth,user=>{
      setUser(user)
      setLoading(false)
    })
  },[user])

  const value = {
    user,
    signInWithGoogle,
    loginWithEmailAndPassword,
    createNewUser,
    resetPassword,
    setUsername,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
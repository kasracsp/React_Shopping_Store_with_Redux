import React,{useContext, useEffect} from 'react'
import { AuthContext } from '../context/AuthContextProvider'
import { useNavigate, useLocation , Link, Outlet } from 'react-router-dom'
import fetchLastOrders from "../redux/lastOrders/lastOrdersAction";
import { useDispatch } from "react-redux";
import { whichPage } from '../helper/functions'
import styles from './Profile.module.css'

const Profile = () => {
  const {user}=useContext(AuthContext)
  const navigate=useNavigate()
  const location=useLocation()
  const pageRoute=whichPage(location.pathname)
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!user) navigate('/',{replace:true})
  },[user])

  useEffect(() => {
    dispatch(fetchLastOrders());
  }, []);

  return (
    <>
      {user && (
        <div className={styles.container}>
          <div className={styles.profileCategory}>
            <Link to="userdetails" className={pageRoute === "userdetails" ? styles.active : ''}>
              user details
            </Link>
            <Link to="userorders" className={pageRoute === "userorders" ? styles.active : ''}>last orders</Link>
          </div>
          <Outlet />
        </div>
      )}
    </>
  );
}

export default Profile
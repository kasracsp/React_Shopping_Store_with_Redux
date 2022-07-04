import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import styles from "./UserDetails.module.css";
import UpdateUsername from "../components/UpdateUsername";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/", { replace: true });
  }, [user]);

  return (
    <>
      {user && (
        <div className={styles.container}>
          {user.displayName ? (
            <div className={styles.userDetails}>
              {user.photoURL ? (
                <img src={user.photoURL} alt="avatar" />
              ) : (
                <span className="material-icons" id={styles.userAvatar}>
                  account_circle
                </span>
              )}
              <div className={styles.userInfo}>
                <h3>user name:</h3>
                <h2>{user.displayName}</h2>
              </div>
            </div>
          ) : (
            <div className={styles.userDetails}>
              {user.photoURL ? (
                <img src={user.photoURL} alt="avatar" />
              ) : (
                <span className="material-icons" id={styles.userAvatar}>
                  account_circle
                </span>
              )}
              <div className={styles.updateUsername}>
                <UpdateUsername />
              </div>
            </div>
          )}
          <div className={styles.userDetails}>
            <span className="material-icons" id={styles.userAvatar}>
              alternate_email
            </span>
            <div className={styles.userInfo}>
              <h3>email address:</h3>
              <h2>{user.email}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

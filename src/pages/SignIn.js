import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./SignIn.module.css";
import GoogleImage from "../assets/google.svg";
import logoImage from "../assets/logoAlt.png";
import { Link } from "react-router-dom";

const SignIn = () => {
  const { user, signInWithGoogle, loginWithEmailAndPassword } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  // console.log(user)

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {user && (
          <div>
            <h1 style={{ color: "green" }}>{user && user.email}</h1>
            {/* <img src={user.photoURL} alt="avatar" /> */}
          </div>
        )}
        <img src={logoImage} alt="logo" />
        <h3>Sign in to your AceMarket account</h3>

        <Formik
          initialValues={{ email: "", password: "", server: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email address is required.";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Please enter a valid email address.";
            }
            if (!values.password) {
              errors.password = "Password is required.";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              await loginWithEmailAndPassword(values.email, values.password);
              setServerError("");
            } catch (error) {
              setSubmitting(false);
              setServerError("Failed to sign in");
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={styles.form}>
              {serverError && (
                <p className={styles.serverError}>{serverError}</p>
              )}
              <div
                className={styles.inputBox}
                id={
                  errors.email
                    ? styles.inputError
                    : touched.email
                    ? styles.inputCorrect
                    : ""
                }
              >
                <Field type="email" name="email" placeholder="Email Address" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
                <div className={styles.materialIcons}>
                  <span className="material-icons" id={styles.errorIcon}>
                    error
                  </span>
                  <span className="material-icons" id={styles.correctIcon}>
                    check_circle
                  </span>
                </div>
              </div>
              <div
                className={styles.inputBox}
                id={
                  errors.password
                    ? styles.inputError
                    : touched.password
                    ? styles.inputCorrect
                    : ""
                }
              >
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={errors.password && "" ? styles.inputError : ""}
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
                <div className={styles.materialIcons}>
                  <span className="material-icons" id={styles.errorIcon}>
                    error
                  </span>
                  <span className="material-icons" id={styles.correctIcon}>
                    check_circle
                  </span>
                  <span
                    className="material-icons"
                    onClick={() => setShowPassword(!showPassword)}
                    id={showPassword ? styles.eyeIcon : ""}
                  >
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </div>
              </div>
              <Link to="/resetpassword" className={styles.forgetPassword}>
                Forget Password?
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitBtn}
              >
                Sign In
              </button>
            </Form>
          )}
        </Formik>

        <fieldset className={styles.fieldSet}>
          <legend>or</legend>
        </fieldset>

        <div className={styles.googleSignIn} onClick={() => signInWithGoogle()}>
          <img src={GoogleImage} alt="google" className={styles.googleThumb} />
          <span className={styles.googleTitle}>Sign in with google</span>
        </div>
        <p className={styles.newAccount}>
          Don't have an account?{" "}
          <Link to="/signup" className={styles.createAccount}>
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

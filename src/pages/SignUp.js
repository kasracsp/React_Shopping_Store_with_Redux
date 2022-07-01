import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./SignIn.module.css";
import logoImage from "../assets/logoAlt.png";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate=useNavigate()
  const { createNewUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img src={logoImage} alt="logo" />
        <h3>Create your AceMarket account</h3>
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            privacy: false,
          }}
          validate={(values) => {
            const errors = {};
            const matches = values.password.match(/[0-9A-Z@]/g) || [];
            if (!values.email) {
              errors.email = "Email address is required.";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Please enter a valid email address.";
            }
            if (!values.password) {
              errors.password = "Password is required.";
            } else if (values.password.length < 8) {
              errors.password = "Use at least 8 character.";
            } else if (matches.length < 1) {
              errors.password = "Use at least 1 Uppercase, number or @";
            }
            if (!values.confirmPassword) {
              errors.confirmPassword = "Confirm Password is required.";
            } else if (values.password !== values.confirmPassword) {
              errors.confirmPassword = "Password doesn't.";
            }
            if (!values.privacy) {
              errors.privacy = "privacy error";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              await createNewUser(values.email, values.password);
              setServerError("");
              navigate("/profile", { replace: true });
            } catch (error) {
              setSubmitting(false);
              setServerError("Failed to create a new account");
            }
          }}
        >
          {({ values, isSubmitting, errors, touched }) => (
            <Form className={styles.form}>
              {serverError && (
                <p className={styles.serverError}>{serverError}</p>
              )}
              <div
                className={styles.inputBox}
                id={
                  touched.email
                    ? errors.email
                      ? styles.inputError
                      : styles.inputCorrect
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
                  touched.password
                    ? errors.password
                      ? styles.inputError
                      : styles.inputCorrect
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
              <div
                className={styles.inputBox}
                id={
                  touched.confirmPassword
                    ? errors.confirmPassword
                      ? styles.inputError
                      : styles.inputCorrect
                    : ""
                }
              >
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className={
                    errors.confirmPassword && "" ? styles.inputError : ""
                  }
                  placeholder="Confirm Password"
                />
                <ErrorMessage
                  name="confirmPassword"
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    id={showConfirmPassword ? styles.eyeIcon : ""}
                  >
                    {showConfirmPassword ? "visibility" : "visibility_off"}
                  </span>
                </div>
              </div>
              <div
                className={styles.checkBox}
                id={
                  touched.privacy
                    ? values.privacy
                      ? styles.inputCorrect
                      : styles.inputError
                    : ""
                }
              >
                <Field type="checkbox" name="privacy" id="privacy" />
                <label htmlFor="privacy">I accept the Terms of Service</label>
                <div className={styles.materialIcons}>
                  <span className="material-icons" id={styles.errorIcon}>
                    error
                  </span>
                  <span className="material-icons" id={styles.correctIcon}>
                    check_circle
                  </span>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitBtn}
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>

        <p className={styles.newAccount}>
          Already have an account?{" "}
          <Link to="/signin" className={styles.createAccount}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

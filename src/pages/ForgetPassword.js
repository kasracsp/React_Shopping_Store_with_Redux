import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./SignIn.module.css";
import { Link } from "react-router-dom";

const SignIn = () => {
  const { resetPassword } = useContext(AuthContext);
  const [serverError, setServerError] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img
          src="https://live.staticflickr.com/65535/52187266808_149712a600_o.png"
          alt="logo"
        />
        <h3>Reset Password</h3>
        <Formik
          initialValues={{ email: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email address is required.";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Please enter a valid email address.";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              await resetPassword(values.email);
              setServerError("");
              setServerMessage("Check your inbox for further instructions");
            } catch (error) {
              setSubmitting(false);
              setServerMessage("");
              setServerError("Email address doesn't exist");
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={styles.form}>
              {serverError && (
                <p className={styles.serverError}>{serverError}</p>
              )}
              {serverMessage && (
                <p className={styles.serverMessage}>{serverMessage}</p>
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
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitBtn}
              >
                Continue
              </button>
            </Form>
          )}
        </Formik>

        <p className={styles.newAccount}>
          <Link to="/signin" className={styles.createAccount}>
            Back to sign in page
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

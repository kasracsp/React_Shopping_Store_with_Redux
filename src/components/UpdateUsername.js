import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./UpdateUsername.module.css";

const UpdateUsername = () => {
  const { setUsername } = useContext(AuthContext);
  const [serverError, setServerError] = useState("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3>Set Username</h3>
        <Formik
          initialValues={{ username: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = "Username is required.";
            } else if (values.username.length > 12) {
              errors.username = "Username can't be more than 12 character.";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              await setUsername(values.username);
              setServerError("");
              window.location.reload(false);
            } catch (error) {
              setSubmitting(false);
              setServerError("username address doesn't exist");
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
                  touched.username
                    ? errors.username
                      ? styles.inputError
                      : styles.inputCorrect
                    : ""
                }
              >
                <Field
                  type="username"
                  name="username"
                  placeholder="Username Address"
                />
                <ErrorMessage
                  name="username"
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
      </div>
    </div>
  );
};

export default UpdateUsername;

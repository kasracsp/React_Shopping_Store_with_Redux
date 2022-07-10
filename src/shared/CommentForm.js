import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContextProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import fetchComments from "../redux/comments/commentsAction";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { useParams } from "react-router-dom";
import styles from "./CommentForm.module.css";

const CommentForm = ({label,productId,parentId,editComment,id}) => {
  const dispatch=useDispatch()
  const params = useParams();
  const { user } = useContext(AuthContext);
  const formikRef = useRef();
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    setServerError('')
    formikRef.current.resetForm()
    if (user) {
      formikRef.current.setFieldValue("email", user.email);
    }else{
      formikRef.current.setFieldValue("email", '');
    }
    if(editComment){
      formikRef.current.setFieldValue("comment", editComment);
    }
  }, [params,user]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Formik
          innerRef={formikRef}
          initialValues={{ email: "", comment: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email address is required.";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Please enter a valid email address.";
            }
            if (!values.comment) {
              errors.comment = "Comment is required.";
            }
            return errors;
          }}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            resetForm({
              values: {
                comment: "",
                email: values.email,
              },
            });
            setSubmitting(true);
            if(label == 'Edit'){
              const data = {
                data: {
                  comment: values.comment.replace(/\n/g, "\n\n"),
                },
              };
              try {
                await axios.put(`http://localhost:1337/api/comments/${id}`, data);
                setServerError("");
                dispatch(fetchComments());
                setSubmitting(false);
              } catch (error) {
                setSubmitting(false);
                setServerError("Failed, please try again");
              }
              return
            }
              const data = {
                data: {
                  userId: v4(),
                  userName: values.email,
                  productId: productId,
                  parentId: parentId,
                  comment: values.comment.replace(/\n/g, "\n\n"),
                },
              };
              try {
                await axios.post("http://localhost:1337/api/comments", data);
                setServerError("");
                dispatch(fetchComments());
                setSubmitting(false);
              } catch (error) {
                setSubmitting(false);
                setServerError("Failed, please try again");
              }
            }
          }
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={styles.form}>
              {serverError && (
                <p className={styles.serverError}>{serverError}</p>
              )}
              {!user && (
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
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email Address"
                  />
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
              )}
              <div
                className={styles.inputBox}
                id={
                  touched.comment
                    ? errors.comment
                      ? styles.inputError
                      : styles.inputCorrect
                    : ""
                }
              >
                <Field
                  as="textarea"
                  name="comment"
                  placeholder="Leave a comment"
                  className={styles.area}
                />
                <ErrorMessage
                  name="comment"
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
                {label}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CommentForm
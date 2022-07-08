import React from 'react'
import axios from 'axios';
import ReactMarkdown from "react-markdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Comment.module.css";


const Comment = ({comment,reply,id}) => {
  const notify = (text) =>
    toast.error(text, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  const deleteComment=async id=>{
    try {
      await axios.delete(`http://localhost:1337/api/comments/${id}`);
    } catch (error) {
      notify('Failed,please try again')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.user}>
          {comment.attributes.userId.substring(0, 3)}*****
          {comment.attributes.userId.substring(
            8,
            comment.attributes.userId.length
          )}
        </p>
        <p className={styles.date}>
          {new Date(comment.attributes.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <ReactMarkdown className={styles.comment}>
        {comment.attributes.comment}
      </ReactMarkdown>
      <div className={styles.buttons}>
        <span className="material-icons" title="reply">
          reply
        </span>
        <span className="material-icons" title="delete" onClick={()=>deleteComment(id)}>
          delete
        </span>
        <span className="material-icons" title="edit">
          edit
        </span>
      </div>
      <div className={styles.replies}>
        {reply.length > 0 &&
          reply.map((reply) => (
            <Comment key={reply.id} comment={reply} reply={[]} id={reply.id} />
          ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Comment
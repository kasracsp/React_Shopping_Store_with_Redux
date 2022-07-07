import React from 'react'
import styles from "./Comment.module.css";

const Comment = ({comment,reply}) => {
  console.log(reply)
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.user}>{(comment.attributes.userId).substring(0,5)}***</p>
        <p className={styles.date}>
          {new Date(comment.attributes.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <p className={styles.comment}>{comment.attributes.comment}</p>
      <div className={styles.buttons}>
        <span className='material-icons' title='reply'>reply</span>
      </div>
    </div>
  );
}

export default Comment
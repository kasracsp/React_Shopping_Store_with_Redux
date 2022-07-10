import React,{useContext,useState} from 'react'
import axios from 'axios';
import ReactMarkdown from "react-markdown";
import { AuthContext } from "../context/AuthContextProvider";
import { hasReply } from '../helper/functions';
import fetchComments from "../redux/comments/commentsAction";
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from "react-toastify";
import CommentForm from '../shared/CommentForm';
import "react-toastify/dist/ReactToastify.css";
import styles from "./Comment.module.css";


const Comment = ({ comment, reply, productId }) => {
  const { user } = useContext(AuthContext);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const canDelete =
    user &&
    user.email === comment.attributes.userName &&
    hasReply(comment.attributes.userId, reply);
  const canEdit =
    user &&
    user.email === comment.attributes.userName &&
    !(new Date() - new Date(comment.attributes.createdAt) > 900000);
  const replyId = comment.attributes.parentId
    ? comment.attributes.parentId
    : comment.attributes.userId;
  const dispatch = useDispatch();
  const notify = (text) => {
    toast.error(text, {
      position: "top-center",
    });
  };

  const deleteComment = async (id) => {
    try {
      await axios.delete(`http://localhost:1337/api/comments/${id}`);
      dispatch(fetchComments());
    } catch (error) {
      notify("Failed,please try again");
    }
  };

  const openFormHandler = (key) => {
    if (key === "edit") {
      setIsEditing(!isEditing);
      setIsReplying(false);
    } else {
      setIsEditing(false);
      setIsReplying(!isReplying);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.user}>
          {comment.attributes.userName.substring(0, 3)}*****
          {comment.attributes.userName.substring(
            8,
            comment.attributes.userName.length
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
        <span
          className="material-icons"
          id={styles.replyBtn}
          title="Reply"
          onClick={() => openFormHandler("reply")}
        >
          reply
        </span>
        {canDelete && (
          <span
            className="material-icons"
            id={styles.deleteBtn}
            title="Delete"
            onClick={() => deleteComment(comment.id)}
          >
            delete
          </span>
        )}
        {canEdit && (
          <span
            className="material-icons"
            id={styles.editBtn}
            title="Edit"
            onClick={() => openFormHandler("edit")}
          >
            edit
          </span>
        )}
      </div>
      {isReplying && (
        <CommentForm label="Reply" productId={productId} parentId={replyId} />
      )}
      {isEditing && (
        <CommentForm
          label="Edit"
          productId={productId}
          parentId={replyId}
          editComment={comment.attributes.comment}
          id={comment.id}
        />
      )}
      <div className={styles.replies}>
        {reply.length > 0 &&
          reply.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              reply={[]}
              productId={productId}
            />
          ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Comment
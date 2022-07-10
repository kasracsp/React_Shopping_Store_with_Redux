import React from "react";
import { useSelector } from "react-redux";
import styles from "./Comments.module.css";
import Comment from "./Comment";
import CommentForm from "../shared/CommentForm";

const Comments = ({ productId }) => {
  const commentsState = useSelector((state) => state.commentsState);

  const productComments = commentsState.comments.filter(
    (item) => item.attributes.productId === productId
  );

  const rootComments = productComments.filter(
    (item) => item.attributes.parentId === null
  );
  rootComments.sort((a, b) => {
    return b.id - a.id;
  });

  const replyFinder = (currentId) => {
    const filterReply = productComments.filter(
      (item) => item.attributes.parentId === currentId
    );
    return filterReply;
  };

  return (
    <div className={styles.container}>
      <CommentForm label="Submit" productId={productId} parentId={null} />
      <h2 className={styles.title}>
        comments{" "}
        <span>
          {productComments.length > 0 && `(${productComments.length})`}
        </span>
      </h2>
      {rootComments.length > 0 ? (
        rootComments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            reply={replyFinder(comment.attributes.userId)}
            productId={productId}
          />
        ))
      ) : (
        <h3>There's no comment yet!</h3>
      )}
    </div>
  );
};

export default Comments;

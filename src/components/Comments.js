import React,{useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from "./Comments.module.css"
import Spinner from '../assets/Spinner.svg'
import Comment from './Comment'

const Comments = ({productId}) => {
  const commentsState=useSelector(state=>state.commentsState)

  const productComments = commentsState.comments.filter(
    (item) => item.attributes.productId === productId
  );

  const rootComments= productComments.filter(item=>item.attributes.parentId === null)

  const replyFinder=currentId=>{
    const filterReply = productComments.filter(
      (item) => item.attributes.parentId === currentId
    );
      return filterReply
  }

  return (
    <div className={styles.container}>
      {commentsState.loading ? (
        <img src={Spinner} alt="loading" />
      ) : commentsState.error ? (
        <h1>{commentsState.error}</h1>
      ) : (
        rootComments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            reply={replyFinder(comment.attributes.userId)}
          />
        ))
      )}
    </div>
  );
}

export default Comments
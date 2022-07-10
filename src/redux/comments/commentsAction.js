import axios from "axios";

const fetchCommentsRequest = () => {
  return {
    type: "FETCH_COMMENTS_REQUEST",
  };
};
const fetchCommentsSuccess=comments=>{
  return {
    type: "FETCH_COMMENTS_SUCCESS",
    payload:comments,
  };
}
const fetchCommentsFailure=error=>{
  return {
    type: "FETCH_COMMENTS_FAILURE",
    payload: error,
  };
}
const fetchComments=()=>{
  return (dispatch)=>{
    dispatch(fetchCommentsRequest())
    axios
      .get(
        "http://localhost:1337/api/comments?pagination[page]=1&pagination[pageSize]=100"
      )
      .then((response) => {
        dispatch(fetchCommentsSuccess(response.data.data));
      })
      .catch((error) => dispatch(fetchCommentsFailure(error.message)));
  };
}

export default fetchComments
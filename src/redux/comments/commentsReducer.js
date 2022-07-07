const initialState={
  loading:false,
  comments:[],
  error:'',
}
const commentsReducer=(state=initialState,action)=>{
  switch (action.type) {
    case "FETCH_COMMENTS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_COMMENTS_SUCCESS":
      return {
        loading: false,
        comments: action.payload,
      };
    case "FETCH_COMMENTS_FAILURE":
      return {
        loading: false,
        error:action.payload,
      };

    default:
      return state;
  }
}

export default commentsReducer
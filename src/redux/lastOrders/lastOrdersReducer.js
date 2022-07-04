const initialState = {
  loading: false,
  orders: [],
  error: "",
};

const lastOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_LAST_ORDERS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_LAST_ORDERS_SUCCESS":
      return {
        loading: false,
        orders: action.payload,
      };
    case "FETCH_LAST_ORDERS_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default lastOrdersReducer;

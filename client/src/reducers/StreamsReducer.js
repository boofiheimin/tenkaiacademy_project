import { FETCH_ALL } from "../constants/actionTypes";

const reducer = (streams = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case "CREATE":
      return streams;
    default:
      return streams;
  }
};

export default reducer;

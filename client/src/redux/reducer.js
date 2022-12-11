import { GET_ALL_DOGS, ERROR } from './action';

const initialState = {
  dogs: [],
  allDogs: [],
  error: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;

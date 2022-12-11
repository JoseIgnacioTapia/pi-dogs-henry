export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const ERROR = 'ERROR';

export const getAllDogs = () => {
  return async function (dispatch) {
    try {
      const response = await fetch('http://localhost:3001/dogs');
      const dogs = await response.json();
      return dispatch({ type: GET_ALL_DOGS, payload: dogs });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

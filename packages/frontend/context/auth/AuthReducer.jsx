const authActionTypes = {
  login: "AUTH-LOGIN-PROCCESS",
  logout: "AUTH-LOGOUT-PROCCESS",
};

export const authInitialState = {
  isAuthenticated: false,
  user: undefined,
};

/**
 *
 * @param {authInitialState} state
 * @param {{type: "AUTH-LOGIN-PROCCESS" | "AUTH-LOGOUT-PROCCESS", payload: any}} action
 */
export const authReducer = (state, action) => {
  switch (action.type) {
    case authActionTypes.login:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case authActionTypes.logout:
      return {
        ...state,
        ...authInitialState,
      };
    default:
      return state;
  }
};
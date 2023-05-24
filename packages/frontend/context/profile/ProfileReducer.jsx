export const profileInitialState = {
  profile: null,
  showForm: false,
};

/**
 *
 * @param {authInitialState} state
 * @param {{type: "PROFILE-SET" | "PROFILE-SHOW-FORM", payload: any}} action
 */
export const profileReducer = (state, action) => {
  switch (action.type) {
    case "PROFILE-SET":
      return {
        ...state,
        profile: action.payload,
      };
    case "PROFILE-SHOW-FORM":
      return {
        ...state,
        showForm: action.payload,
      };
    default:
      return state;
  }
};

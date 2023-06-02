export const profileInitialState = {
  profile: null,
  showForm: false,
};

/**
 *
 * @param {authInitialState} state
 * @param {{type: "PROFILE-SET" | "PROFILE-SHOW-FORM" | "PROFILE-FAVORITES-ADD" | "PROFILE-FAVORITES-REMOVE", payload: any}} action
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
      case "PROFILE-FAVORITES-ADD":
        return {
          ...state,
          profile: {
            ...state.profile,
            favorites: [...(state.profile.favorites || []), action.payload],
          },
        };
        case "PROFILE-FAVORITES-REMOVE":
          return {
            ...state,
            profile: {
              ...state.profile,
              favorites: state.profile.favorites.filter(
                (favorite) => favorite.id !== action.payload
              ),
            },
          };
    default:
      return state;
  }
};

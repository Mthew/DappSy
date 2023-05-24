import { createContext, useReducer, useEffect } from "react";

import { axios } from "../../utils";
import { profileReducer, profileInitialState } from "./ProfileReducer";

export const ProfileContext = createContext({});

export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, profileInitialState);

  const getProfileInfo = async (name) => {
    const result = await axios.get(`/profile/${name}`, {
      params: { name },
    });

    if (result.data) {
      dispatch({ type: "PROFILE-SET", payload: result.data });
    }
  };

  const showProfileForm = (show) =>
    dispatch({ type: "PROFILE-SHOW-FORM", payload: show });

  const saveProfileData = async (data) => {
    const result = await axios.put(`/profile`, { ...data, confirmed: true });

    console.log("updated-data", result);
    if (result.data) {
      dispatch({ type: "PROFILE-SET", payload: result.data });
      showProfileForm(false);
    }
  };

  const addToFavorites = async (project) => {
    const result = await axios.put(`/profile`, {
      ...state.profile,
      favorites: [...(state.profile.favorites || []), project.id],
    });

    if (result.data) {
      dispatch({ type: "PROFILE-FAVORITES-ADD", payload: project.id });
    }
  };

  const isFavorite = (id) => {
    return state.profile?.favorites?.includes(id);
  };

  return (
    <ProfileContext.Provider
      value={{
        ...state,

        //methods
        getProfileInfo,
        showProfileForm,
        saveProfileData,
        addToFavorites,
        isFavorite,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

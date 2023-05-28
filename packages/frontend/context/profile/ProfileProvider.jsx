import { createContext, useReducer, useEffect, useContext } from "react";

import { axios } from "../../utils";
import { profileReducer, profileInitialState } from "./ProfileReducer";

import { AuthContext } from "../auth";

export const ProfileContext = createContext({});

export const ProfileProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [state, dispatch] = useReducer(profileReducer, profileInitialState);

  useEffect(() => {
    if (user) {
      getProfileInfo(user.id);
    }
  }, [user]);

  const getProfileInfo = async (id) => {
    const result = await axios.get(`/profile/${id}`, {
      params: { id },
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

  const addToFavorites = async (projectId) => {
    const result = await axios.put(`/profile`, {
      ...state.profile,
      favorites: [...(state.profile.favorites || []), projectId],
    });

    if (result.data) {
      dispatch({ type: "PROFILE-FAVORITES-ADD", payload: projectId });
    }
  };
  const getFavorites = async () => {
    if(state.profile?.favorites == null) return null;

    if(state.profile?.favorites?.length == 0) return null;

    const result = await axios.get(`/projects`, {
      params: {
        ids: state.profile?.favorites,
      },
    });

    if (result.data) {
      dispatch({ type: "PROFILE-FAVORITES-SET", payload: result.data });
    }
  }
  const isFavorite = (projectId) => {
    return state.profile?.favorites?.includes(projectId);
  };

  const buyTokens = async (projectId, amount) => {
    // const result = await axios.put(`/profile`, {
    //   ...state.profile,
    //   tokens: state.profile.tokens - amount,
    //   projects: [
    //     ...state.profile.projects,
    //     {
    //       projectId,
    //       amount,
    //     },
    //   ],
    // });
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
        buyTokens,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

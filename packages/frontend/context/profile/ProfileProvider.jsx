import { createContext, useReducer, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { ROUTES, axios, showWarningAlert } from "../../utils";
import { profileReducer, profileInitialState } from "./ProfileReducer";

import { AuthContext } from "../auth";

export const ProfileContext = createContext({});

export const ProfileProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [state, dispatch] = useReducer(profileReducer, profileInitialState);

  useEffect(() => {
    if (user) {
      getProfileInfo(user.id);
    }
  }, [user]);

  const setProfile = (profile) => {
    dispatch({ type: "PROFILE-SET", payload: profile });
  };

  const getProfileInfo = async (id) => {
    const result = await axios.get(`/profile/${id}`, {
      params: { id },
    });

    if (result.data) {
      setProfile(result.data);
    }
  };

  const showProfileForm = (show) =>
    dispatch({ type: "PROFILE-SHOW-FORM", payload: show });

  const saveProfileData = async (data) => {
    const result = await axios.put(`/profile`, { ...data, confirmed: true });

    console.log("updated-data", result);
    if (result.data) {
      setProfile(result.data);
      showProfileForm(false);
    }
  };

  const addToFavorites = async (projectId, callback) => {
    const result = await axios.put(`/profile`, {
      ...state.profile,
      favorites: [...(state.profile.favorites || []), projectId],
    });

    if (result.data) {
      dispatch({ type: "PROFILE-FAVORITES-ADD", payload: projectId });
      callback && callback();
    }
  };
  const isFavorite = (projectId) => {
    return state.profile?.favorites?.includes(projectId);
  };

  const validateProfileConfirmed = () => {
    if (state.profile?.confirmed == false) {
      showWarningAlert({
        title: "Información de contacto sin configurar",
        message:
          "Por favor, diligencie su información de contacto para poder continuar.",
        onOk: () => router.replace(ROUTES.profile),
      });
    }
    return state.profile?.confirmed;
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
        setProfile,
        validateProfileConfirmed,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

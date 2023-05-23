import { createContext, useReducer, useEffect } from "react";

import { axios } from "../../utils";
import { profileReducer, profileInitialState } from "./ProfileReducer";

export const ProfileContext = createContext({});

export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, profileInitialState);

  useEffect(() => {
    console.log("STATE", state);
  }, [state]);

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
    console.log("profile-data ===>", data);
    const result = await axios.put(`/profile`, data);

    console.log("updated-data", result);
    if (result.data) {
    //   dispatch({ type: "PROFILE-SET", payload: result.data });
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        ...state,

        //methods
        getProfileInfo,
        showProfileForm,
        saveProfileData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

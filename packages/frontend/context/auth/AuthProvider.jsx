import { createContext, useReducer, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signOut, signIn } from "next-auth/react";
import { useDisconnect } from "wagmi";

import { authReducer, authInitialState } from "./AuthReducer";
import { ROUTES } from "../../utils";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const { data, status } = useSession();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      console.log("User Authenticated", data);
      dispatch({ type: "AUTH-LOGIN-PROCCESS", payload: data?.user });
    }
  }, [status, data]);

  const handlers = {
    login: async (signature, message) => {
      const data = await signIn("credentials", {
        message: JSON.stringify(message),
        signature,
        redirect: false,
        callbackUrl: "",
      });
      return data;
    },
  };

  const login = async (signature, siweMessage) => {
    const data = await handlers.login(signature, siweMessage);
    if (data.status === 200) {
      router.push(ROUTES.home);
    }
  };

  const logout = () => {
    signOut({
      redirect: false,
    });
    disconnect();
    dispatch({ type: "AUTH-LOGOUT-PROCCESS" });
    return router.push(ROUTES.login);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        //methods
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import React, { useContext } from "react";
import { Web3SignButton } from ".";

import { AuthContext } from "../../context";

const LoginButton = ({ token }) => {
  const { login } = useContext(AuthContext);
  return (
    <Web3SignButton
      label="Iniciar sesión"
      message="¿Desea iniciar session con su cuenta de metamask?"
      onConnect={login}
      token={token}
    />
  );
};

export default LoginButton;

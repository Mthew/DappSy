import { useEffect, useContext } from "react";
import { AuthContext } from "../../context";

function Signout() {
  const { logout } = useContext(AuthContext);
  
  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="content-center">
      <h1>Cerrando sesion...</h1>
    </div>
  );
}

export default Signout;

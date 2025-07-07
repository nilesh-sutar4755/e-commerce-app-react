import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

interface Props {
  element: React.ReactNode;
}
const ProtectedRoutes = ({ element }: Props) => {
  const { authenticated } = useContext(AuthContext);

  const location = useLocation();
  const redirectTo = location.pathname && `?redirectTo=${location.pathname}`;

  if (!authenticated) {
    return <Navigate to={`/access-denied${redirectTo}`} />;
  }

  return element;
};

export default ProtectedRoutes;

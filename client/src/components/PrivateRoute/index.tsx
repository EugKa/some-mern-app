import { Navigate, useLocation } from "react-router-dom";
import { selectUser } from "../../store/features";
import { useAppSelector } from "../../store/hooks";


export function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuth } = useAppSelector(selectUser)
  let location = useLocation();
  const token = localStorage.getItem('token');  

  if (!token && !isAuth) {
    return <Navigate to="/account/login" state={{ from: location }} replace />;
  }

  return children;
 }
import { Navigate, useLocation } from "react-router-dom";
import { selectUser } from "../../store/features/user/userSlice";
import { useAppSelector } from "../../store/hooks";

export function RequireAuth({ children }: { children: JSX.Element }) {
   let user = useAppSelector(selectUser)
   let location = useLocation();
 
   if (!user.isAuth) {
     return <Navigate to="/account/login" state={{ from: location }} replace />;
   }
 
   return children;
 }
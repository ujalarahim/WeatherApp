import {useAuth} from "../hooks/useAuth.jsx"
import { Outlet, Navigate } from "react-router"

const ProtectedRoutes =  () =>{

    const {isAuthenticated, loading}=useAuth()

    // Debugging: Check console to see if isLoading starts as true
    console.log("Auth State:", { loading, isAuthenticated });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <Outlet/>
}

export default ProtectedRoutes
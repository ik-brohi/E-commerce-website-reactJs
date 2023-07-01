import React, { useContext } from 'react';

import { Navigate, useLocation } from "react-router-dom";
import { userContext } from '../../Components/context/AuthProvider';
import UseSeller from '../../Hooks/UseSeller';

const SellerRoute = ({ children }) => {
    const { user } = useContext(userContext);
    const [isSeller, isLoading] = UseSeller(user?.email);
    const location = useLocation();
    if (isLoading) {
        return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-blue-400"></div>;
    }

    if (!user && !isSeller) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }

    return (children);

};

export default SellerRoute;
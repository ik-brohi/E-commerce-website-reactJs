import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import UseAdmin from '../../Hooks/UseAdmin';
import useTitle from '../../Hooks/UseHook';
import UseSeller from '../../Hooks/UseSeller';
import { userContext } from '../context/AuthProvider';


const DashBoard = () => {
    useTitle('DashBoard')
    const { user } = useContext(userContext);
    const [isSeller] = UseSeller(user?.email);
    const [isAdmin] = UseAdmin(user?.email);
    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>

                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        <li><Link to='/dashboard'>My Orders</Link></li>

                        {
                            isAdmin ?
                                <>
                                    <li><Link to='/dashboard/allusers'>All Users</Link></li>
                                    <li><Link to='/dashboard/allseller'>All Sellers</Link></li>
                                    <li><Link to='/dashboard/allbuyres'>All Buyers</Link></li>
                                </> : ""
                        }
                        {
                            isSeller ?
                                <>
                                    <li><Link to='/dashboard/seller'>My Products(Seller)</Link></li>
                                    <li><Link to='/dashboard/seller/input'>Add Product</Link></li>
                                    <li><Link to='/dashboard/seller/ordered'>Ordered by buyer</Link></li>
                                </> : ""
                        }

                        {/* <li><Link to='/dashboard/doctors'>Add Doctor</Link></li> */}
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoard;
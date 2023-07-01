import { createBrowserRouter } from "react-router-dom";
import Blog from "../Components/Blog/Blog";
import AllBuyer from "../Components/DashBoard/AllBuyer";
import AllSeller from "../Components/DashBoard/AllSeller";
import Allusers from "../Components/DashBoard/Allusers";
import AddProductSeller from "../Components/DashBoard/seller/AddProductSeller";
import MyOrder from "../Components/DashBoard/seller/MyOrder";
import Order from "../Components/DashBoard/seller/Order";
import Seller from "../Components/DashBoard/seller/Seller";
import Error from "../Components/Error/Error";
import Index from "../Components/IndexPage/Index";
import Phone from "../Components/PhonePage/Phone";
import Login from "../Components/signIn/Login";
import Register from "../Components/signIn/Register";
import Payment from "../Components/wishList/Payment";
import WishList from "../Components/wishList/WishList";
import DashBoardLayout from "../MainPage/DashBoardLayout";
import MainPage from "../MainPage/MainPage";
import AdminRoute from "./Private/AdminRoute";
import PrivateRoute from "./Private/PrivateRoute";
import SellerRoute from "./Private/SellerRoute";


const route = createBrowserRouter([
    {
        path: '/',
        element: <MainPage></MainPage>,
        errorElement:<Error></Error>,
        children: [
            {
                path: '/',
                element: <Index></Index>
            },
            {
                path: '/home',
                element: <Index></Index>
            },
            {
                path: '/phone/:brand',
                loader: ({ params }) => fetch(`https://second-hand-ecom-serverside.vercel.app/phones/${params.brand}`),
                element: <PrivateRoute><Phone></Phone></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/wistlist',
                element: <WishList></WishList>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },

        ],
    },
    {
        path: '/dashboard',
        element: <DashBoardLayout></DashBoardLayout>,
        errorElement:<Error></Error>,
        children: [
            {
                path: '/dashboard',
                element: <MyOrder></MyOrder>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute><Allusers></Allusers></AdminRoute>
            },
            {
                path: '/dashboard/allseller',
                element: <AdminRoute><AllSeller></AllSeller></AdminRoute>
            },
            {
                path: '/dashboard/allbuyres',
                element: <AdminRoute><AllBuyer></AllBuyer></AdminRoute>
            },

            {
                path: '/dashboard/seller',
                element: <SellerRoute><Seller></Seller></SellerRoute>
            },
            {
                path: '/dashboard/seller/input',
                element: <SellerRoute><AddProductSeller></AddProductSeller></SellerRoute>
            },
            {
                path: '/dashboard/seller/ordered',
                element: <SellerRoute><Order></Order></SellerRoute>
            },
            {
                path: '/dashboard/payment/:id',
                loader:({params})=>fetch(`https://second-hand-ecom-serverside.vercel.app/wistlist/${params.id}`),
                element: <Payment></Payment>
            },


        ]
    }

])
export default route;
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { userContext } from '../../context/AuthProvider';
import Loader from '../../Loader/Loader';
import OrderCard from '../../../Components/DashBoard/seller/OrderCard';
const MyOrder = () => {
    const { user } = useContext(userContext);

    const { isLoading, data: wistlists = [] } = useQuery({
        queryKey: ['wistlists'],
        queryFn: () =>
            fetch(`https://second-hand-ecom-serverside.vercel.app/wistlist?buyer_email=${user.email}`).then(res =>
                res.json()
            )
    })

    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div>
            <p className='font-bold text-xl my-5 text-center'>Order Page</p>

            {
                wistlists[0]?.paid? wistlists.map(wistlist=>
                <OrderCard
                wistlist={wistlist}
                ></OrderCard>) :""
            }

        </div>
    );
};

export default MyOrder;
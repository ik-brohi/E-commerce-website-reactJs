import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userContext } from '../../context/AuthProvider';
import Loader from '../../Loader/Loader';


const Order = () => {
    const { user } = useContext(userContext);
    const { isLoading, data: phones = [] } = useQuery({
        queryKey: ['Phones'],
        queryFn: () =>
            fetch(`https://second-hand-ecom-serverside.vercel.app/order/${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res =>
                    res.json()
                )
    })
    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div>
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
                <h2 className="mb-4 text-2xl font-semibold leading-tight">Order products</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                        <colgroup>

                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />

                            <col className="w-24" />
                        </colgroup>
                        <thead className="dark:bg-gray-700">
                            <tr className="text-left">
                                <th className="p-3">SL</th>
                                <th className="p-3">Image</th>
                                <th className="p-3">Buyer Location</th>
                                <th className="p-3">Buyer Name</th>
                                <th className="p-3">Product Name</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Phone Number</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                phones.map((phone, index) =>
                                    phone?.paid ? <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                                        <td className="p-3">
                                            <p>{index + 1}</p>
                                        </td>
                                        <td className="p-3">
                                            <div className="avatar">
                                                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                    <img alt="/" src={phone.image} />
                                                </div>
                                            </div>

                                        </td>
                                        <td className="p-3">
                                            <p className="dark:text-gray-400">{phone.buyer_location}</p>
                                        </td>
                                        <td className="p-3">
                                            <p className="dark:text-gray-400">{phone.buyer_name}</p>
                                        </td>
                                        <td className="p-3">
                                            <p className="dark:text-gray-400">{phone.item_name}</p>
                                        </td>
                                        <td className="p-3">
                                            <p className="dark:text-gray-400">$ {phone.price}</p>
                                        </td>
                                        <td className="p-3">
                                            <p className="dark:text-gray-400">{phone.buyer_number}</p>
                                        </td>

                                        <td className="p-3 text-right">
                                            <span className="px-3 py-1 font-semibold rounded-md dark:bg-indigo-400 dark:text-gray-900">
                                                <span>Delete</span>
                                            </span>
                                        </td>

                                    </tr> : ""
                                )
                            }


                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Order;
import React, { useEffect, useState } from 'react';
import Categori from './Categori/Categori';
import image1 from '../../image/iPhone-14-PNG-File.png';
import DiscountBanner from './DIscountBanner/DiscountBanner';
import { useQuery } from '@tanstack/react-query'
import Loader from '../Loader/Loader';
import AdverTiseCard from '../AdverTise/AdverTiseCard';
import axios from 'axios';
import useTitle from '../../Hooks/UseHook';
const Index = () => {

    const [Advertise, setAdvertise] = useState([]);
    useTitle('Home')
    const getRepo = () => {
        axios.get('https://second-hand-ecom-serverside.vercel.app/adviretise').then(res => {
            setAdvertise(res.data)
            console.log(res.data);
        })
    }

    useEffect(() => getRepo(), [])

    const { isLoading, data: categoris = [] } = useQuery({
        queryKey: ['categoris'],
        queryFn: () =>
            fetch('https://second-hand-ecom-serverside.vercel.app/brand').then(res =>
                res.json()
            )
    })

    if (isLoading) {
        return <Loader></Loader>

    }



    return (
        <section className="dark:bg-gray-800 dark:text-gray-100">

            <div className="container p-6 mx-auto space-y-6 sm:space-y-12">
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img alt='' src={image1} className="max-w-sm" />
                        <div>
                            <h1 className="text-5xl font-bold">Box Office Phone!</h1>
                            <p className="py-6">
                                A smartphone is a cellular telephone with an integrated computer and other features not originally associated with telephones such as an operating system, web browsing, and the ability to run software applications.</p>
                            <button className="btn btn-primary">Get Started</button>
                        </div>
                    </div>
                </div>

                {/* Advertise section */}
                <p className='font-bold text-3xl text-center my-5'>Avertised Products</p>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 justify-items-center my-5 gap-5 mx-4'>
                    {
                        Advertise?.length === 0 ? <p className='text-3xl font-bold text-red-800'>NO Advertise Item</p> :
                            Advertise?.map(ads =>
                                ads?.role === "isAdvertise" ?
                                    <AdverTiseCard
                                        phone={ads}
                                    ></AdverTiseCard> : ""

                            )
                    }
                </div>


                <p className='font-bold text-3xl text-center border-b-2 p-2'>Second Hand phone Categories</p>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5 justify-center justify-items-center'>
                    {
                        isLoading ? <Loader></Loader> :
                            categoris.map(cate =>
                                <Categori
                                    key={cate._id}
                                    cate={cate}
                                ></Categori>)

                    }
                </div>
                <DiscountBanner></DiscountBanner>

            </div>
        </section>

    );
};

export default Index;
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loader from '../Loader/Loader';

const AllSeller = () => {
    const url = 'https://second-hand-ecom-serverside.vercel.app/seller';

    const { isLoading,refetch, error, data: sellers = [] } = useQuery({
        queryKey: ['sellers'],
        queryFn: () =>
            fetch(url).then(res =>
                res.json()
            )
    })

    if(isLoading){
        return <Loader></Loader>
    }

    const handleDelete=(seller)=>{
    
     fetch(`https://second-hand-ecom-serverside.vercel.app/seller/${seller._id}`, {
        method: 'DELETE', 
        // headers: {
        //     authorization: `bearer ${localStorage.getItem('accessToken')}`
        // }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.deletedCount > 0){
            refetch();
            // toast.success(`Doctor ${doctor.name} deleted successfully`)
        }
    })
}
    
    

    return (
        <div className='flex flex-col my-5'>
            {
                sellers.map(seller =>
                    seller.role === 'isSeller' ?
                        <div className="max-w-md p-8 sm:flex sm:space-x-6 dark:bg-gray-900 dark:text-gray-100">
                            <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
                                <img src="https://source.unsplash.com/100x100/?portrait?1" alt="" className="object-cover object-center w-full h-full rounded dark:bg-gray-500" />
                            </div>
                            <div className="flex flex-col space-y-4">
                                <div>
                                    <h2 className="text-2xl font-semibold uppercase">{seller.name}</h2>
                                    <span className="text-sm dark:text-gray-400">{seller.role}</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="flex items-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Email address" className="w-4 h-4">
                                            <path fill="currentColor" d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"></path>
                                        </svg>
                                        <span className="dark:text-gray-400">{seller.email}</span>
                                    </span>
                                    <span className="flex items-center space-x-2">
                                       <button onClick={()=>handleDelete(seller)} className='text-red-700 font-bold text-xl'>X Delete</button>
                                        
                                    </span>
                                </div>
                            </div>
                        </div> : "")
            }
        </div>
    );
};

export default AllSeller;
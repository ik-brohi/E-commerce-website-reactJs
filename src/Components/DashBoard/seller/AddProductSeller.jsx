import React, { useContext, useState } from 'react';
import { userContext } from '../../context/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddProductSeller = () => {
    const hostimageKey = process.env.REACT_APP_imgbb_key;
    const { user } = useContext(userContext);
    const [isloading, setIsloading] = useState(false);
    const [isApproved, setIsApproved] = useState("");
    const buyerUrl = `https://second-hand-ecom-serverside.vercel.app/GetAprroveBuyer?email=${user?.email}`;
    fetch(buyerUrl).then(res => res.json()).then(data => {
        setIsloading(true);
        setIsApproved(data[0]?.role);


    })

    const handleProduct = (e) => {
        e.preventDefault();
        const productName = e.target.name.value;
        const model_role = e.target.model_role.value;
        const location = e.target.location.value;
        const r_price = e.target.r_price.value;
        const o_price = e.target.o_price.value;
        const uses = e.target.uses.value;
        const number = e.target.number.value;
        const description = e.target.description.value;
        const file = e.target.image.files;
        const image = file[0];
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${hostimageKey}`;
        fetch(url, {

            method: 'POST',
            body: formData
        }).then(res => res.json()).then(data => {

            const SellerData = {
                seller: user.displayName,
                email: user.email,
                buyerApprovel: isApproved,
                dateTime,
                brand: model_role,
                productName,
                location,
                resalePrice: r_price,
                originalPrice: o_price,
                yearOfUse: uses,
                number,
                description,
                image: data.data.url,
            }
            console.log(SellerData);
            fetch("https://second-hand-ecom-serverside.vercel.app/phones", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(SellerData),
            })
                .then(res => {
                    setIsloading(true);
                    res.json()
                })
                .then(data => {
                    toast("Data insert successfully")
                    setIsloading(false);
                    console.log(data)
                })

        })
    }

    return (
        <div>
            <p className='font-bold text-3xl my-2'>Add Product</p>

            <section className="p-6">
                <form onSubmit={handleProduct} className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm">

                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">


                            <div className="col-span-full sm:col-span-3">
                                <select name='model_role' className="select select-bordered w-full max-w-xs">
                                    <option selected>iphone</option>
                                    <option>realme</option>
                                    <option>redmi</option>
                                </select>
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <input type="text" name="name" placeholder="Product name" className="input input-bordered input-secondary w-full max-w-xs" />
                            </div>
                            <div className="col-span-full sm:col-span-3">

                                <input type="text" id="lastname" placeholder='Location' name="location" className="input input-bordered input-secondary w-full max-w-xs" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <input type="file" name="image" className="file-input file-input-bordered w-full max-w-xs" />

                            </div>
                            <div className="col-span-full sm:col-span-3">

                                <input type="text" name="r_price" placeholder="Resale Price" className="input input-bordered input-secondary w-full max-w-xs" />
                            </div>
                            <div className="col-span-full">

                                <input type="text" name="o_price" placeholder="Original Price" className="input input-bordered input-secondary w-full max-w-xs" />
                            </div>
                            <div className="col-span-full sm:col-span-2">

                                <input type="text" name="uses" placeholder="Yerar of use" className="input input-bordered input-secondary w-full max-w-xs" />
                            </div>
                            <div className="col-span-full sm:col-span-2">

                                <input type="text" name="number" placeholder="Phone Number" className="input input-bordered input-secondary w-full max-w-xs" />
                            </div>
                            <div className="col-span-full sm:col-span-2">

                                <input type="text" name="description" placeholder="description" className="input input-bordered input-secondary w-full max-w-xs" />
                            </div>
                        </div>
                    </fieldset>
                    {
                        isloading ? <button className="btn btn-outline w-96">Insert</button>
                            : <button className="btn btn-outline w-96">Inserting...</button>
                    }

                </form>
            </section>
            <ToastContainer />
        </div>
    );
};

export default AddProductSeller;
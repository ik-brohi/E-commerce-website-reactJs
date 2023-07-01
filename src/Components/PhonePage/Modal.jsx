import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Modal = ({ getPhone, user }) => {
    const { email, image, location, originalPrice, productName, resalePrice, seller, yearOfUse } = getPhone;
    const handleModal = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const item_name = e.target.item_name.value;
        const email = e.target.email.value;
        const price = e.target.price.value;
        const number = e.target.number.value;
        const meet_location = e.target.meet_location.value;

        const order = {
            buyer_name: name,
            item_name,
            buyer_email: email,
            price,
            buyer_number: number,
            buyer_location: meet_location,
            seller_email: getPhone.email,
            image,
            seller_location: location,
            seller_number: getPhone.number,
            seller,

        }

        const url = 'https://second-hand-ecom-serverside.vercel.app/wistlist';
        fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(order)

        }).then(res => res.json()).then(data => {
            toast("Order has been placed successfully")
            console.log(data)})
    }
    return (
        <div>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box relative">
                <label htmlFor="my-modal-6" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <section className="p-6 dark:text-gray-50">
                        <form onSubmit={handleModal} className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                            <fieldset className="grid gap-6 p-6 rounded-md shadow-sm">
                                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                    <div className="col-span-full sm:col-span-3">
                                        <input type="text" placeholder="User Name" name="name" defaultValue={user.displayName} readOnly className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="col-span-full sm:col-span-3">
                                        <input type="text" placeholder="Item name" name="item_name" defaultValue={productName} readOnly className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="col-span-full sm:col-span-3">

                                        <input type="text" name="email" defaultValue={user.email} readOnly placeholder="Email" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="col-span-full sm:col-span-3">
                                        <input type="text" name="price" defaultValue={resalePrice} readOnly placeholder="Price" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="col-span-full sm:col-span-3">
                                        <input type="text" name="number" placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="col-span-full sm:col-span-3">
                                        <input type="text" name="meet_location" placeholder="Meeting location" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                </div>
                            </fieldset>
                            <div className="modal-action">
                                <button htmlFor="my-modal-6" className="btn">Book</button>
                            </div>
                        </form>
                    </section>

                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Modal;
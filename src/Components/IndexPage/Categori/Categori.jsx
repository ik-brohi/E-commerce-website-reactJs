import React from 'react';
import { Link } from 'react-router-dom';

const Categori = ({ cate }) => {
    const { brand } = cate;
    return (
        <>
            <div className="card w-full bg-base-100 shadow-xl">
                <div className="card-body">

                    <h2 className="card-title uppercase">{brand}!</h2>

                    <div className="card-actions justify-end">
                        <Link to={`/phone/${brand}`}><button className="btn btn-primary">Visit Now</button></Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Categori;
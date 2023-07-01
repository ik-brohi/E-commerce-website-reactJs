import React from 'react';
import DashBoard from '../Components/DashBoard/DashBoard';
import Navbar from '../Shared/Navbar';

const DashBoardLayout = () => {
    return (
        <>
           <Navbar></Navbar>
           <DashBoard></DashBoard> 
        </>
    );
};

export default DashBoardLayout;
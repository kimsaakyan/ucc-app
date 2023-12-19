import React from 'react';
import { Outlet } from 'react-router-dom';
import MainMenu from '../components/MainMenu';

const MainLayout = () => {
    return (
        <>
            <MainMenu />
            <Outlet />
        </>
    );
};

export default MainLayout;

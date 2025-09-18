import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function MainLayout() {
    return (
        <div>
            <Navbar />
            <main>
                {/* The current page component will be rendered here */}
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;
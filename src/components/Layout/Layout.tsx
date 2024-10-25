import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header'; 
import "./Layout.scss";


interface LayoutProps {
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div>
            <Header />
            <main className="main-container">
                {children}
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar"; // Assuming NavBar is in the same directory
import AppHeader from "./AppHeader"; // Assuming AppHeader is in the same directory

const MainLayout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <>
            {isHomePage ? <NavBar /> : <AppHeader />}
            <Outlet /> {/* This will render the matched child route element */}
        </>
    );
};

export default MainLayout;

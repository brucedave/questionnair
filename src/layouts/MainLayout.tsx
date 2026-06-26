import type { FC } from "react";
import { Outlet } from "react-router-dom";
const MainLayout:FC = () => {
    return (
        <div>
            <h1>MainLayout</h1>
            <Outlet />
        </div>
    );
};

export default MainLayout;
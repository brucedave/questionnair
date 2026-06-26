import type { FC } from "react";
import { Outlet } from "react-router-dom";
const ManageLayout:FC = () => {
    return (
        <div>
            <h1>ManageLayout</h1>
            <Outlet />
        </div>
    );
};

export default ManageLayout;
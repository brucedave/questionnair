import type { FC } from "react";
import { Outlet } from "react-router-dom";
const QuestionLayout:FC = () => {
    return (
        <div>
            <h1>QuestionLayout</h1>
            <Outlet />
        </div>
    );
};

export default QuestionLayout;
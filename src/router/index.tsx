import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ManageLayout from "../layouts/ManageLayout";
import QuestionLayout from "../layouts/QuestionLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import List from '../pages/manage/List';
import Trash from '../pages/manage/Trash';
import Star from '../pages/manage/Star';

const Edit = lazy(/* webpackChunkName: "Edit" */ () => import('../pages/question/Edit'));
const Stat = lazy(/* webpackChunkName: "Stat" */ () => import('../pages/question/Stat'));


const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'register',
          element: <Register />,
        },
        {
          path: 'manage',
          element: <ManageLayout />,
          children: [
            {
              path: 'list',
              element: <List />,
            },
            {
              path: 'trash',
              element: <Trash />,
            },
            {
              path: 'star',
              element: <Star />,
            },
          ],
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
    {
      path: 'question',
      element: <QuestionLayout />,
      children: [
        {
          path: 'edit/:id',
          element: <Edit />,
        },
        {
          path: 'stat/:id',
          element: <Stat />,
        },
      ],
    },
  ]);
  export default router;
//----------------分割线-------------------
//常用的路由 常量
export const HOME_PATHNAME = '/';
export const LOGIN_PATHNAME = '/login';
export const REGISTER_PATHNAME = '/register';
export const MANAGE_INDEX_PATHNAME = '/manage/list';

export function isLoginOrRegister(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
  return false;
}

export function isNoNeedUserInfo(pathname: string) {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
  return false;
}
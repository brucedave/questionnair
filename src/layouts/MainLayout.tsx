import type { FC } from "react";
import { Outlet } from "react-router-dom";
import { Layout,Spin } from "antd";
import Logo from "../components/Logo";
import UserInfo from "../components/UserInfo";
import styles from "./MainLayout.module.scss";
import useNavPage from "../hooks/useNavPage";
import useGetUserInfo from "../hooks/useGetUserInfo";
import useLoadUserData from "../hooks/useLoadUserData";
const { Header, Content, Footer } = Layout;

const MainLayout:FC = () => {
    const {waitingUserData } = useLoadUserData();
    useNavPage(waitingUserData);
    return (
        <Layout>
            <Header className={styles.header}>
                <div className={styles.left}><Logo /></div>
                <div className={styles.right}><UserInfo /></div>
            </Header>
            <Layout className={styles.main}>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
            <Footer className={styles.footer}>问卷调查&copy;2026 - present. created by ling</Footer>
        </Layout>
    );
};

export default MainLayout;
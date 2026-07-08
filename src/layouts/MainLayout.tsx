import type { FC } from "react";
import { Outlet } from "react-router-dom";
import { Layout,Spin } from "antd";

import styles from "./MainLayout.module.scss";
const { Header, Content, Footer } = Layout;

const MainLayout:FC = () => {
    return (
        <Layout>
            <Header className={styles.header}>
                <div className={styles.left} style={{color: "white"}}>left-logo</div>
                <div className={styles.right}>right-user-info</div>
            </Header>
            <Layout className={styles.main}>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
            <Footer className={styles.footer}>Footer</Footer>
        </Layout>
    );
};

export default MainLayout;
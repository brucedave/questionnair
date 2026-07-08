const UserInfo = () => {
    return (
        <div className={styles.userInfo}>
            <div className={styles.userInfo_avatar}>
                <img src={avatar} alt="avatar" />
            </div>
            <div className={styles.userInfo_name}>
                <span>user-name</span>
            </div>
        </div>
    );
};

export default UserInfo;
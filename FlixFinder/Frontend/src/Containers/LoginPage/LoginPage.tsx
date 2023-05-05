import React, { useContext } from "react";
import styles from "./LoginPage.module.css";
import Logo from "../../Components/Logo/Logo";
import TwitterAuth from "../../Components/TwitterAuth/TwitterAuth";

const LoginPage = () => {
    const twitterLogin = () => {
        window.location.href = "http://localhost:4000/auth/twitter";
    }
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    < Logo small={false} />
                </div>
                <div className={styles.subtitle}>
                    <h1>find what's worth watching</h1>
                </div>
                <div className={styles.twitter}>
                    <TwitterAuth onClick={twitterLogin} />
                </div>
            </div>
        </div>
    );
}; 

export default LoginPage
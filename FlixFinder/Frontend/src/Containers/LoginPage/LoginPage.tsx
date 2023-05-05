import React, { useContext } from "react";
import styles from "./LoginPage.module.css";
import Logo from "../../Components/Logo/Logo";
import Background from "./assets/Background.svg";
import TwitterAuth from "../../Components/TwitterAuth/TwitterAuth";

const LoginPage = () => {
    const twitterLogin = () => {
        window.location.href = "http://localhost:4000/auth/twitter";
    }
    return (
            <div className={styles.page}>
                < img src={Background} className={styles.background} />
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
    );
}; 

export default LoginPage
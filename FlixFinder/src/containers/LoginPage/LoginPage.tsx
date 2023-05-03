import React from "react";
import styles from "./LoginPage.module.css";
import Logo from "../../components/Logo/Logo.tsx";
import TwitterAuth from "../../components/TwitterAuth/TwitterAuth.tsx";
import Background from "./assets/Background.svg";

const LoginPage = () => {
    return (
        <div className={styles.page}>
            < img src ={Background} className={styles.background} />
            <div className={styles.logo}>
                < Logo />
            </div>
            <div className={styles.subtitle}>
                <h1>find what's worth watching</h1>
            </div>
            <div className={styles.twitter}>
                < TwitterAuth />
            </div>
        </div>
    );
}; 


export default LoginPage
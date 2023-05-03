import React from "react";
import styles from "./LoginPage.module.css";
import Logo from "../../Components/Logo/Logo";
// import TwitterAuth from "../../Components/TwitterAuth/TwitterAuth";
import Background from "./assets/Background.svg";

const LoginPage = () => {
    return (
        <div className={styles.page}>
            < img src ={Background} className={styles.background} />
            <div className={styles.logo}>
                < Logo small/>
            </div>
            <div className={styles.subtitle}>
                <h1>find what's worth watching</h1>
            </div>
            <div className={styles.twitter}>
            </div>
        </div>
    );
}; 


export default LoginPage
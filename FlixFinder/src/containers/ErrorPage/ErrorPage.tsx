import React from "react";
import styles from "./ErrorPage.module.css";
import Logo from "../../components/Logo/Logo.tsx";
import Background from "./assets/Background.svg";

const ErrorPage = () => {
    return (
        <div className={styles.page}>
            < img src ={Background} className={styles.background} />
            <div className={styles.logo}>
                < Logo small/>
            </div>
            <div className={styles.subtitle}>
                <h1>ERROR</h1>
            </div>
        </div>
    );
}; 


export default ErrorPage
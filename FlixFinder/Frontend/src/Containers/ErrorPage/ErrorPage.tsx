import React from "react";
import styles from "./ErrorPage.module.css";
import Logo from "../../Components/Logo/Logo";

const ErrorPage = () => {
    return (
        <div className={styles.page}>
            <div className={styles.logo}>
                < Logo small/>
            </div>
            <div className={styles.subtitle}>
                <h1>PAGE NOT FOUND <span>:(</span></h1>
            </div>
        </div>
    );
}; 


export default ErrorPage
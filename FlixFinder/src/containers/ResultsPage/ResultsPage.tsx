import React from "react";
import styles from "./ResultsPage.module.css";
import Logo from "../../components/Logo/Logo.tsx";
import Background from "./assets/Background.svg";

const ResultsPage = () => {
    return (
        <div className={styles.page}>
            < img src ={Background} className={styles.background} />
            <div className={styles.logo}>
                < Logo small/>
            </div>
            <div className={styles.subtitle}>
                <h1>WELCOME, USER</h1>
            </div>
        </div>
    );
}; 


export default ResultsPage
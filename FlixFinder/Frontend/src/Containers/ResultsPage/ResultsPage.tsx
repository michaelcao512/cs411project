import React, { useContext } from "react";
import styles from "./ResultsPage.module.css";
import Logo from "../../Components/Logo/Logo";
import Background from "./assets/Background.svg";
import axios, { AxiosResponse } from 'axios';
import { myContext } from '../../Context';
import { IUser } from "../../types/maintypes";

const ResultsPage = () => {
    const logout = () => {
        axios.get("http://localhost:4000/auth/logout", {withCredentials: true}).then((res: AxiosResponse) => {
            if (res.data === "done") {
                window.location.href = "/";
            }
        })
    }
    const context = useContext(myContext) as IUser;
    console.log(context);
    return (
        <div className={styles.page}>
            <div>
                < img src={Background} className={styles.background} />
            </div>
            <div className={styles.logo}>
                < Logo small/>
            </div>
            <div className={styles.subtitle}>
                <h1>WELCOME, {context.username}</h1>
                <h1 className={styles.logout} onClick={logout}>LOGOUT</h1>
            </div>
        </div>
    );
}; 


export default ResultsPage
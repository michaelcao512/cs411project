import React, { useContext, useState, useEffect } from "react";
import styles from "./ResultsPage.module.css";
import { Link } from "react-router-dom";

import Logo from "../../Components/Logo/Logo";
import Background from "./assets/Background.svg";

import axios, { AxiosResponse } from 'axios';
import { myContext } from '../../Context';
import { IUser } from "../../types/maintypes";

const ResultsPage = () => {
    const context = useContext(myContext) as IUser;

    const [userTweets, setUserTweets] = useState("");
    useEffect(() => {
        axios.get(`http://localhost:4000/user/${context.twitterId}`,
            { withCredentials: true }).then((res: AxiosResponse) => {
                setUserTweets(res.data);
            })
        }, [])
        
    console.log(userTweets);
    
    const logout = () => {
        axios.get("http://localhost:4000/auth/logout", {withCredentials: true}).then((res: AxiosResponse) => {
            if (res.data === "done") {
                window.location.href = "/";
            }
        })
    }
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
import React, { useContext, useState, useEffect } from "react";
import styles from "./ResultsPage.module.css";
import { Link } from "react-router-dom";

import Logo from "../../Components/Logo/Logo";
import joy from "./assets/joy.svg";
import sadness from "./assets/sadness.svg";
import fear from "./assets/fear.svg";
import disgust from "./assets/disgust.svg";
import anger from "./assets/anger.svg";
import loading from "./assets/loading.svg";

import axios, { AxiosResponse } from 'axios';
import { myContext } from '../../Context';
import { IUser } from "../../types/maintypes";

type Movie = {
    id: string;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
};

const ResultsPage = () => {
    const context = useContext(myContext) as IUser;

    const [userResults, setUserResults] = useState("");

    const [userEmotion, setUserEmotion] = useState("");

    const [userRecommendation, setUserRecommendation] = useState<Movie[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:4000/user/${context.twitterId}`,
            { withCredentials: true }).then((res: AxiosResponse) => {
                setUserResults(res.data);
            })
    }, [])
    
    useEffect(() => {
        if (userResults.length > 1) {
            setUserEmotion(userResults[1]);
        }
    }, [userResults]);

    useEffect(() => {
        if (userResults.length > 1) {
            const recommendationData = JSON.parse(userResults[2]);
            setUserRecommendation(recommendationData.results);
            console.log(userRecommendation);
        }
    }, [userResults]);
        
    const logout = () => {
        axios.get("http://localhost:4000/auth/logout", {withCredentials: true}).then((res: AxiosResponse) => {
            if (res.data === "done") {
                window.location.href = "/";
            }
        })
    }

    return (
        <div className={styles.page}>
            <div className={styles.logo}>
                < Logo small/>
            </div>
            <div className={styles.subtitle}>
                <h1>WELCOME, {context.username}</h1>
                <h2 onClick={logout}>logout</h2>
            </div>
            <div className={styles.dataHeader}>
                <h2>EMOTION</h2>
                <h2>RECOMMENDATION</h2>
                <h2>CREDITS</h2>
            </div>
            <div className={styles.dataContainer}>
                <div className={styles.emotionContainer}>
                    <img src={userEmotion === "joy" ? joy : userEmotion === "sadness" ? sadness : userEmotion === "fear" ? fear : userEmotion === "disgust" ? disgust : userEmotion === "anger" ? anger : loading} alt={userEmotion} />
                    <h2>{userEmotion}</h2>
                </div>
                <div className={styles.movieBox}>
                    {userRecommendation.map((movie) => (
                        <div key={movie.id} className={styles.movieContainer}>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <div className={styles.movieInfo}>
                                <h3>{movie.title} ({movie.release_date.slice(0, 4)})</h3>
                                <hr />
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.creditContainer}>
                    <h2>Project by</h2>
                    <p>Kenneth Thomson (ken1212@bu.edu)</p>
                    <p>Grace Elias (gelias@bu.edu)</p>
                    <p>Michael Cao (mcao124@bu.edu)</p>
                    
                </div>
            </div>
        </div>
    );
}; 


export default ResultsPage
import React, { FC, MouseEventHandler } from "react";
import twitterButton from "./assets/twitterButton.svg";
import styles from "./TwitterAuth.module.css";

interface TwitterAuthProps {
    onClick: MouseEventHandler<HTMLImageElement>;
}

const TwitterAuth: FC<TwitterAuthProps> = (props) => {
    return <img className={styles.twitterAuth} src={twitterButton} alt="twitterButton" onClick={props.onClick}/>;
};

export default TwitterAuth;
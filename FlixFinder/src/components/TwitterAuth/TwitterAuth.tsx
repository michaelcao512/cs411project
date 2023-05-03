import React, { FC } from "react";
import twitterButton from "./assets/twitterButton.svg";

interface TwitterAuthProps {
    onClick: Function;
}

const TwitterAuth: FC<TwitterAuthProps> = (props) => {
    return <img src={twitterButton} alt="twitterButton" onClick={props.onClick}/>;
};

export default TwitterAuth;
import React, { FC } from "react";
import logo from "./assets/logo.png";
import logoSmall from "./assets/logo-small.png";

interface LogoProps {
    small: boolean;
}

const Logo: FC<LogoProps> = (props) => {
    return <img src={props.small ? logoSmall : logo} alt="logo"/>;
};

export default Logo;
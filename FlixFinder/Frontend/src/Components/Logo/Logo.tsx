import React, { FC } from "react";
import { Link } from 'react-router-dom';
import logo from "./assets/logo.png";
import logoSmall from "./assets/logo-small.png";

interface LogoProps {
    small: boolean;
}

const Logo: FC<LogoProps> = (props) => {
    return <Link to="/"><img src={props.small ? logoSmall : logo} alt="logo"/></Link>;
};

export default Logo;
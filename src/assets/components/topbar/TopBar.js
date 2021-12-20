import React, { useEffect, useState } from "react";
import "./topbar.css"
import Toggle from "./Toggle"
import MenuBtn from "./MenuBtn";

const TopBar = (props) => {
    const { status } = props;

    return <div className={` top-bar bottom-shadow ${status ? 'inactive' : ''}`}>
        <MenuBtn />
        <Toggle 
            stat = {status}
        />
    </div>
};

export default TopBar;
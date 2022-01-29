import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./button.css"

const InputField = (props) => {
    const { classes } = props;
    var cls = ' ';
    if(classes && classes.length >= 1){
        classes.forEach(cl => {
            cls += cl;
            cls += ' ';
        });
    }
    
    useEffect(()=>{})
    console.log(cls);
    return(
        <input className={cls} type="search"></input>
    )
}

export default InputField;
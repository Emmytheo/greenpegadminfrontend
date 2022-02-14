import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./button.css"

const Button = (props) => {
    const { text, classes, route } = props;
    var cls = 'btn ';
    if(classes && classes.length > 1){
        classes.forEach(cl => {
            cls += cl;
            cls += ' ';
        });
    }
    
    useEffect(()=>{})
    
    return(
        <button className={cls} uk-toggle="target: #my-modal" type="button">{text}</button>
    )
}

export default Button;
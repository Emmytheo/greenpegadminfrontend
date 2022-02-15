import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "../basicComponents.js/button";



const ButtonList = (props) => {

    return(
        <div>
            <br></br>
            <br></br>
            <ul className="all-inline side-margins-10">
                <li>
                    <Button 
                        text={'Products'}
                        classes={[
                            "search-prod",
                            "waves-effect", 
                            "no-border",
                            "waves-light",
                            'pad-12-28',
                            'btn-row-active',
                            'color-white'
                        ]}
                                
                    />
                </li>
                <li>
                    <Button 
                        text={'Service & Product'}
                        classes={[
                            "search-prod",
                            "waves-effect", 
                            "no-border",
                            "waves-light",
                            'pad-12-28',
                            'btn-row',
                            "color-gray",
                        ]}
                                
                    />
                </li>
                                  
            </ul>
        </div>
    )
};

export default ButtonList;
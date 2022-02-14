import React, { useEffect, useState } from "react";
import "./modal.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container } from 'react-bootstrap'




const Modal = (props) => {
    const { page } = props;
    var output = [];

    switch (page) {
        case 'request':
            
            break;
    
        default:
            output = 
            
            <div id="my-modal" classname='uk-flex-top' uk-modal= {'true'}>
                
                <div classname="uk-modal-dialog modals uk-margin-auto-vertical uk-modal-body">
                    <center>
                    <Card style={{width: "500px", padding: '30px'}}>
                                <h2 class="uk-modal-title">Headline</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                <p class="uk-text-right">
                                    <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                                    <button class="uk-button uk-button-primary" type="button">Save</button>
                                </p>
                            </Card>
                    </center>
                
                    
                    
                    
                </div>
            </div>
            ;
            break;
    }
    

    
    useEffect(()=>{
        
    })
    
    return output
};

export default Modal;
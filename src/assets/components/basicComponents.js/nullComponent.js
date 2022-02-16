import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "./button";
import Select from "./select";
import InputField from "./inputField";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container } from 'react-bootstrap'
import init from "../basicComponents.js/init";
import { NavLink } from "react-router-dom";
import './nullComponent.css'



const NullComponent = (props) => {
    const { page, action } = props;
    var output = [];
    var generateNull = (page) => {
        switch (page) {
            case 'partner':
                output[0] = 
                    <center>
                        <Row>
                            <Col xs={2} md={3} lg={4} xl={4} xxl={5}></Col>
                            <Col xs={8} md={6} lg={4} xl={4} xxl={3}>
                                <Card className="null-center">
                                <Card.Body>
                                    <p className="null-text">
                                        +<br/>
                                        {`Add a ${page}`}
                                    </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={2} md={3} lg={4} xl={4} xxl={4}></Col>
                        </Row>
                        
                    </center>
                    ;
                break;
            case 'project':
                    output[0] = 
                        <center>
                            <Row>
                                <Col xs={2} md={3} lg={4} xl={4} xxl={5}></Col>
                                <Col xs={8} md={6} lg={4} xl={4} xxl={3}>
                                    <Card className="null-center">
                                    <Card.Body>
                                        <p className="null-text">
                                            +<br/>
                                            {`Add a ${page}`}
                                        </p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={2} md={3} lg={4} xl={4} xxl={4}></Col>
                            </Row>
                            
                        </center>
                        ;
                    break;
        
            default:
    
                break;
        }
        return output;
    }
    

    return [
        generateNull(page)
    ];

};

export default NullComponent;
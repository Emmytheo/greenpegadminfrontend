import React, { useEffect, useState } from "react";
import SideMenu from "../sidemenu/SideMenu";
import TopBar from "../topbar/TopBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container } from 'react-bootstrap'
import InputField from "../basicComponents.js/inputField";
import Select from "../basicComponents.js/select";
import Button from "../basicComponents.js/button";
import init from "../basicComponents.js/init";
import { NavLink } from "react-router-dom";
import Table from "../accordionTable";
import NullComponent from "../basicComponents.js/nullComponent";

const Works = (props) => {
    const [inactive, setInactive] = useState(props.inactiv) ;

    const select1 = [
        {name: "Categories"},
        {name: "Endress+Hauser (125)"},
        {name: "SEW (243)"},
        {name: "Durag (93)"},
        {name: "Schneider Electric (109)"},
        {name: "Megger (71)"},
    ]
    const select2 = [
        {name: "Date"},
        {name: "Endress Hauser"},
        {name: "Endress Hauser"},
        {name: "Endress Hauser"},
        {name: "Endress Hauser"},
    ]
    
    useEffect(() => {
        new init();
    }, [])

    return (
        <div>
            <SideMenu onCollapse={props.onCollapse} inactiv={props.inactiv} />
            <TopBar 
                status={props.inactiv}
            />
            <div className={`container ${props.inactiv ? 'inactive' : ''} works`}>
            <Row className="align-items-center justify-content-space-around row first">
                    <Col sm={12} md={6} lg={2} xl={2} xxl={2} className="all-inline">
                        
                        <Card.Body className="title pad-10">
                            <h1>Projects</h1>
                        </Card.Body>
                    </Col>
                    <Col sm={12} md={6} lg={4} xl={4} xxl={5} className="all-inline">
                        <Card.Body style={{width: "170px"}}></Card.Body>
                    </Col>
                    <Col xs={10} sm={9} md={5} lg={2} xl={2} xxl={2} className="all-inline no-pad-lft" >
                    
                    <Select 
                                    items={select2}
                                />
                                
                    </Col>
                    <Col xs={12} sm={12} md={7} lg={4} xl={4} xxl={3}>
                        <Card.Body >
                        <Row>
                            <Col xs={7} md={7} lg={7} xl={7} xxl={7} className="all-inline no-padding">
                            <Select 
                                    items={select1}
                                />
                            </Col>
                            <Col xs={5} md={5} lg={5} xl={5} xxl={5} className="all-inline">
                            <Button 
                                text={'Filter'}
                                classes={[
                                    "btn-primary", 
                                    "search-prod",
                                    "waves-effect", 
                                    "no-border",
                                    "waves-light"
                                ]}
                                
                            />
                            </Col>
                        </Row>
                        
                        
                        </Card.Body>
                    </Col>
                </Row>
                <br></br>
                <br></br>
                <Row className="align-items-center justify-content-space-around">
                    <Col md={12} lg={12} xl={12} xxl={12}>
                        <Card  className={'table'}>
                            <Card.Body>
                            <Row>
                                <Col className="side-margins-10" style={{overflow: 'auto'}}>
                                <br></br>
                                <br></br>
                                <ul className="all-inline side-margins-10">
                                    <li>
                                        <Button 
                                            text={'All works'}
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
                                            text={'Published'}
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
                                    <li>
                                        <Button 
                                            text={'Draft'}
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
                                    <li>
                                        <Button 
                                            text={'Archived'}
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
                                </Col>
                                
                            </Row>
                            
                                <center id="table">
                                    {
                                        // <Table 
                                        //     type={'requests'}
                                        //     big={false}
                                        //     stripped={true}
                                        //     divider={false}
                                        // />
                                        <NullComponent
                                            page={'project'}
                                            action={null}
                                        />
                                    }
                                    
                                </center>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            
        </div>
        
    )
};

export default Works;
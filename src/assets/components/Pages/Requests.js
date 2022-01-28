import React, { useEffect, useState } from "react";
import SideMenu from "../sidemenu/SideMenu";
import TopBar from "../topbar/TopBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container } from 'react-bootstrap'
import Select from "../basicComponents.js/select";
import Button from "../basicComponents.js/button";
import "../requestsWidgets/requests.css";
import init from "../basicComponents.js/init";
import { NavLink } from "react-router-dom";
import Table from "../accordionTable";

const Requests = (props) => {
    const [inactive, setInactive] = useState(false) ;
    const select1 = [
        {name: "Categories (OEMs)"},
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
    function closeAllSelect(elmnt) {
        /* A function that will close all select boxes in the document,
        except the current select box: */
        var x, y, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
          if (elmnt == y[i]) {
            arrNo.push(i)
          } else {
            y[i].classList.remove("select-arrow-active");
          }
        }
        for (i = 0; i < xl; i++) {
          if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
          }
        }
        
    }

    
    useEffect(() => {
        new init();
        // fetch('https://randomuser.me/api/1.1/?results=105')
        // .then(response => response.json())
        // .then(data => { 
        //     setDat(data);
        // }); 
    }, [])
    
    // fetch('https://randomuser.me/api/1.1/?results=105')
    //     .then(response => response.json())
    //     .then(data => { 
    //         setDat(data);
    // });
    
    

    return (
        <div>
            <SideMenu onCollapse={(inactive) => {
                // console.log(inactive);
                setInactive(inactive);
            }} />
            <TopBar 
                status={inactive}
            />
            <div className={`container ${inactive ? 'inactive' : ''} requests`}>
                <Row className="align-items-center justify-content-space-around row first">
                    <Col sm={12} md={6} lg={2} xl={2} xxl={2} className="all-inline">
                        
                        <Card.Body className="title pad-10">
                            <h1>Request for Quotes</h1>
                        </Card.Body>
                    </Col>
                    <Col xs={12} md={6} lg={5} xl={5} xxl={5} >
                        <Card.Body className="pad-10">
                            <Row>
                                <Col xs={12} md={12} lg={12} xl={12} xxl={7} className="all-inline">
                                    <Select 
                                        items={select1}
                                    />
                                    <Button 
                                        text={'Filter'}
                                        classes={[
                                            "btn-primary", 
                                            "w-sm", 
                                            "waves-effect", 
                                            "bttn", 
                                            "waves-light"
                                        ]}
                                    />
                                    
                                </Col>
                                <Col xs={12} md={12} lg={12} xl={12} xxl={5} className="all-inline">
                                    <Select 
                                        items={select2}
                                    />
                                    <Button 
                                        text={'Sort'}
                                        classes={[
                                            "btn-primary", 
                                            "w-sm", 
                                            "waves-effect", 
                                            "bttn", 
                                            "waves-light"
                                        ]}
                                    />
                                    
                                </Col>
                            </Row>
                        </Card.Body>
                        
                    </Col>
                    <Col sm={12} md={6} lg={4} xl={4} xxl={4}>
                        <Card.Body className="pad-10">
                        <Row>
                            <Col xs={12} md={12} lg={12} xl={12} xxl={12} className="all-inline">
                            <Button 
                                        text={'All (23)'}
                                        classes={[
                                            "no-fill", 
                                            "pad-bg-18", 
                                            "fnt-norm",
                                            "waves-effect",  
                                            "waves-light",
                                            "color-gray",
                                            "no-border"
                                        ]}
                                    />
                                    <Button 
                                        text={'Opened (12)'}
                                        classes={[
                                            "no-fill", 
                                            "pad-bg-18", 
                                            "fnt-norm",
                                            "waves-effect",  
                                            "waves-light",
                                            "color-gray",
                                            "no-border"
                                        ]}
                                    />
                                    <Button 
                                        text={'Pending (12)'}
                                        classes={[
                                            "no-fill", 
                                            "pad-bg-18", 
                                            "fnt-norm",
                                            "waves-effect",  
                                            "waves-light",
                                            "color-gray",
                                            "no-border"
                                        ]}
                                    />
                                </Col>
                                
                            </Row>
                        </Card.Body>
                    </Col>
                    <Col sm={12} md={6} lg={1} xl={1} xxl={1}>
                        <Card.Body className="pad-10">
                        <Button 
                            text={'Export'}
                            classes={[
                                "fill-orange", 
                                "pad-bg-30", 
                                "fnt-norm",
                                "waves-effect",  
                                "waves-light",
                                "color-white"
                            ]}
                        />
                        </Card.Body>
                    </Col>
                </Row>
                <br></br>
                <br></br>
                <Row className="align-items-center justify-content-space-around">
                    <Col md={12} lg={12} xl={12} xxl={12}>
                        <Card  className={'table'}>
                            <Card.Body>
                                <center id="table">
                                    {
                                        <Table 
                                            type={'requests'}
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

export default Requests;
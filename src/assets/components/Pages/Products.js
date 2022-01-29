import React, { useState, useEffect } from "react";
import SideMenu from "../sidemenu/SideMenu";
import TopBar from "../topbar/TopBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container } from 'react-bootstrap'
import Select from "../basicComponents.js/select";
import Button from "../basicComponents.js/button";
import init from "../basicComponents.js/init";
import InputField from "../basicComponents.js/inputField";
import { NavLink } from "react-router-dom";
import Table from "../accordionTable";

const Products = (props) => {
  const [inactive, setInactive] = useState(props.inactiv);
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

    useEffect(() => {
        new init();
    }, [])

    return (
      <div>
          <SideMenu onCollapse={props.onCollapse} inactiv={props.inactiv} />
          <TopBar 
              status={props.inactiv}
          />
          <div className={`container ${props.inactiv ? 'inactive' : ''} products`}>
          <Row className="align-items-center justify-content-space-around row first">
                    <Col sm={12} md={6} lg={2} xl={2} xxl={2} className="all-inline">
                        
                        <Card.Body className="title pad-10">
                            <h1>Products</h1>
                        </Card.Body>
                    </Col>
                    <Col sm={12} md={6} lg={1} xl={2} xxl={3} className="all-inline">
                        <Card.Body style={{width: "170px"}}></Card.Body>
                    </Col>
                    <Col sm={12} md={6} lg={5} xl={4} xxl={3} className="all-inline">
                    
                    <Select 
                                    items={select1}
                                />
                                <Button 
                                    text={'Filter'}
                                    classes={[
                                        "fill-gray",
                                        "waves-effect", 
                                        "color-white-12px",
                                        "waves-light"
                                    ]}
                                />
                    </Col>
                    <Col sm={12} md={6} lg={4} xl={4} xxl={4}>
                        <Card.Body className="pad-10">
                        <Row>
                            <Col xs={12} md={12} lg={8} xl={7} xxl={6} className="all-inline no-padding">
                                <InputField 
                                    classes={[
                                        "search-inp"
                                    ]}
                                />
                            </Col>
                            <Col xs={12} md={12} lg={4} xl={5} xxl={6} className="all-inline">
                            <Button 
                                text={'Search products'}
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
          </div>
          
      </div>
      
  )
  };

export default Products;
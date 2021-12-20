import React, { useEffect, useState } from "react";
import client from '../../../feathers';

import '../../css/authpage.css';
import logo from '../../images/greenpegs/logo_dark.png'
import avatar from '../../images/greenpegs/avatar.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container } from 'react-bootstrap'
import { NavLink } from "react-router-dom";


const RecoverPswd = (props) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    function updateField(cb) {
        return ev => {
        cb(ev.target.value);
        };
    }

    function login() {
        return client
        .authenticate({
            strategy: 'local',
            email,
            password,
        })
        .catch(err => setError(err));
    }

    function signup() {
        return client
        .service('users')
        .create({ email, password })
        .then(() => login());
    }

    return(
        <div className="auth">
            <div className="bg"></div>
            <Container fluid>
                <Row className="align-items-center justify-content-center no-padding">
                    <Col md={8} lg={6} xl={5} xxl={4}>
                        <center>
                            <img src={logo} alt="logo"></img>
                            <br></br>
                            <br></br>
                        </center>
                        <Card>
                            <Card.Body>
                            <div class="text-center mt-2">
                                        <h5 class="txt-primary">Reset Password</h5>
                                        <p class="text-muted">Reset Password with Greenpeg Account Manager.</p>
                                    </div>
                                    <div class="p-2 mt-4">
                                        <div class="alert alert-success text-center mb-4" role="alert">
                                            Enter your Email and instructions will be sent to you!
                                        </div>
                                        <form action="https://themesbrand.com/minible/layouts/index.html">
            
                                            <div class="mb-3">
                                                <label class="form-label" for="useremail">Email</label>
                                                <input type="email" class="form-control" id="useremail" placeholder="Enter email"></input>
                                            </div>
                                            
                                            <div class="mt-3 text-end">
                                                <button class="btn btn-primary w-sm waves-effect waves-light" type="submit">Reset</button>
                                            </div>
                
    
                                            <div class="mt-4 text-center">
                                                <p class="mb-0">Remember It ? <NavLink to={"/login"}><a class="fw-medium txt-primary"> Sign in </a></NavLink> </p>
                                            </div>
                                        </form>
                                    </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </div>
    )


}

export default RecoverPswd;

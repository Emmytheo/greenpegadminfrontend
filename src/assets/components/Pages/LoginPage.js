import React, { useEffect, useState } from "react";
import client from '../../../feathers';

import '../../css/authpage.css';
import logo from '../../images/greenpegs/logo_dark.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container } from 'react-bootstrap'
import { NavLink } from "react-router-dom";


const LoginPage = (props) => {
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
        .catch(err => {
            setError(err);
            window.location.assign("/home");
        });

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
                            <div className="text-center mt-2">
                                    <h5 className="txt-primary">Welcome Back !</h5>
                                    { error ? 
                                    ( <p>{error && error.message}</p> ) : 
                                    (
                                        <p className="text-muted">Sign in to continue to Greenpeg Admin.</p>
                                    )}
                                </div>
                                <div className="p-2 mt-4">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label" for="email">Username</label>
                                            <input type="email" class="form-control" id="email" placeholder="Enter email" onChange={updateField(setEmail)}></input>
                                        </div>
                
                                        <div className="mb-3">
                                            <div className="float-end">
                                                <NavLink to={"/recover"}><a class="text-muted">Forgot password?</a></NavLink>
                                            </div>
                                            <label className="form-label" for="password">Password</label>
                                            <input type="password" class="form-control" id="password" placeholder="Enter password" onChange={updateField(setPassword)}></input>
                                        </div>
                
                                        <div className="form-check">
                                            <input type="checkbox" class="form-check-input" id="auth-remember-check"></input>
                                            <label className="form-check-label" for="auth-remember-check">Remember me</label>
                                        </div>
                                        
                                        <div className="mt-3 text-end">
                                        <button className="btn btn-primary w-sm waves-effect waves-light" id="login" onClick={() => login()} type="button">Log In</button>
                                        </div>
            
                                        

                                        <div className="mt-4 text-center">
                                            <div className="signin-other-title">
                                                <h5 className="font-size-14 mb-3 title">Sign in with</h5>
                                            </div>
                                            
            
                                            <ul className="list-inline">
                                                <li className="list-inline-item">
                                                    <a href="javascript:void()" class="social-list-item bg-primary text-white border-primary">
                                                        <i className="bi bi-facebook"></i>
                                                    </a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="javascript:void()" class="social-list-item bg-info text-white border-info">
                                                        <i className="bi bi-twitter"></i>
                                                    </a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="javascript:void()" class="social-list-item bg-danger text-white border-danger">
                                                        <i className="bi bi-google"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="mt-4 text-center">
                                            <p className="mb-0">Don't have an account ? <NavLink to={"/signup"}><a class="fw-medium txt-primary"> Signup now </a></NavLink>  </p>
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

export default LoginPage;

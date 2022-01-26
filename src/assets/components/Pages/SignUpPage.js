import React, { useEffect, useState } from "react";
import client from '../../../feathers';

import '../../css/authpage.css';
import logo from '../../images/greenpegs/logo_dark.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container } from 'react-bootstrap'
import { NavLink } from "react-router-dom";


const SignUpPage = (props) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [error, setError] = useState();
    var errr = null;

    function updateField(cb) {
        return ev => {
        cb(ev.target.value);
        // console.log(ev.target.value);
        };
    }

    function login() {
        setError(null);
        errr = null;
        return client
        .authenticate({
            strategy: 'local',
            email,
            password,
        })
        .catch(err => {
            setError(err);
            errr = err;
            
        })
        .then(res => {
            if(errr != null){
                setError(errr);
            }
            else{
                document.getElementById('info').innerText = "Login Successful";
                window.location.assign("/home");
            }
            
        })
    }

    function signup() {
        return client
        .service('users')
        .create({ email, password })
        .then(() => login());
    }

    return(
        <div className="auth">
            <div className="bg">
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
                                    <h5 className="txt-primary">Register Account</h5>
                                    { error ? 
                                    ( <p id="info">{error && error.message}</p> ) : 
                                    (
                                        <p id="info" className="text-muted">Get your free Greenpeg Admin account now.</p>
                                    )}
                                </div>
                                <div className="p-2 mt-4">
                                    <form>
        
                                        <div className="mb-3">
                                            <label className="form-label" for="email">Email</label>
                                            <input type="email" className="form-control" id="email" onChange={updateField(setEmail)} placeholder="Enter email"></input>        
                                        </div>
                
                                        <div className="mb-3">
                                            <label className="form-label" for="username">Username</label>
                                            <input type="text" className="form-control" id="username" onChange={updateField(setName)} placeholder="Enter username"></input>
                                        </div>
                
                                        <div className="mb-3">
                                            <label className="form-label" for="password">Password</label>
                                            <input type="password" className="form-control" id="password" placeholder="Enter password" onChange={updateField(setPassword)}></input>        
                                        </div>

                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="auth-terms-condition-check"></input>
                                            <label className="form-check-label" for="auth-terms-condition-check">I accept <a href="javascript: void(0);" className="text-dark">Terms and Conditions</a></label>
                                        </div>

                                    
                                        
                                        <div className="mt-3 text-end">
                                            <button className="btn btn-primary w-sm waves-effect waves-light" id="signup" onClick={() => signup()} type="button">Register</button>
                                        </div>
            
                                        <div className="mt-4 text-center">
                                            <div className="signin-other-title">
                                                <h5 className="font-size-14 mb-3 title">Sign up using</h5>
                                            </div>
                                            
            
                                            <ul className="list-inline">
                                                <li className="list-inline-item">
                                                    <a href="javascript:void()" className="social-list-item bg-primary text-white border-primary">
                                                        <i className="bi bi-facebook"></i>
                                                    </a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="javascript:void()" className="social-list-item bg-info text-white border-info">
                                                        <i className="bi bi-twitter"></i>
                                                    </a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="javascript:void()" className="social-list-item bg-danger text-white border-danger">
                                                        <i className="bi bi-google"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="mt-4 text-center">
                                            <p className="text-muted mb-0">Already have an account ? <NavLink to={"/login"}><a className="fw-medium txt-primary"> Login</a></NavLink></p>
                                        </div>
                                    </form>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            </div>
            

        </div>
    )


}

export default SignUpPage;

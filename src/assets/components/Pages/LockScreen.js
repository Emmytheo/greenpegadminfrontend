import React, { useEffect, useState } from "react";
import client from '../../../feathers';

import '../../css/authpage.css';
import logo from '../../images/greenpegs/logo_dark.png'
import avatar from '../../images/greenpegs/avatar.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container } from 'react-bootstrap'
import { NavLink } from "react-router-dom";


const LockScreen = (props) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    var errr = null;

    function updateField(cb) {
        
        return ev => {
        cb(ev.target.value);
        
        };
    }

    function login() {
        setError(null);
        errr = null;
        return client
        .authenticate()
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
                                        <h5 className="txt-primary">LockScreen</h5>
                                        { error ? 
                                        ( <p id="info">{error && error.message}</p> ) : 
                                        (
                                            <p id="info" className="text-muted">Enter your password to unlock the screen!</p>
                                        )}
                                    </div>
                                    <div className="p-2 mt-4">
                                        <div className="user-thumb text-center mb-4">
                                            <img src={avatar} className="rounded-circle img-thumbnail avatar-lg" alt="thumbnail"/>
                                            <h5 className="font-size-15 mt-3 font-size-14">Admin</h5>
                                        </div>
                                        <form>
            
                                            <div className="mb-3">
                                                <label className="form-label" for="password">Password</label>
                                                <input type="password" className="form-control" id="password" placeholder="Enter password" onChange={updateField(setPassword)}></input>
                                            </div>
                                            
                                            <div className="mt-3 text-end">
                                                <button className="btn btn-primary w-sm waves-effect waves-light" id="login" onClick={() => login()} type="button">Unlock</button>
                                            </div>
                
    
                                            <div className="mt-4 text-center">
                                                
                                                <p className="mb-0">Not you ? return <NavLink to={"/login"}><a className="fw-medium txt-primary"> Sign In </a></NavLink></p>
                                                
                                                
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

export default LockScreen;

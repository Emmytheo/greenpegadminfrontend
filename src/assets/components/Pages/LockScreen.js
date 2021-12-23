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
        })
        .then(res => {
            if(error){
                console.log(error);
            }
            else{
                res = {};
                res.message = "Login Successful";
                setError(res);
                // window.location.assign("/home");
            }
            
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
                            <div class="text-center mt-2">
                                        <h5 class="txt-primary">LockScreen</h5>
                                        { error ? 
                                        ( <p>{error && error.message}</p> ) : 
                                        (
                                            <p class="text-muted">Enter your password to unlock the screen!</p>
                                        )}
                                    </div>
                                    <div class="p-2 mt-4">
                                        <div class="user-thumb text-center mb-4">
                                            <img src={avatar} class="rounded-circle img-thumbnail avatar-lg" alt="thumbnail"/>
                                            <h5 class="font-size-15 mt-3 font-size-14">Admin</h5>
                                        </div>
                                        <form>
            
                                            <div class="mb-3">
                                                <label class="form-label" for="password">Password</label>
                                                <input type="password" class="form-control" id="password" placeholder="Enter password" onChange={updateField(setPassword)}></input>
                                            </div>
                                            
                                            <div class="mt-3 text-end">
                                                <button class="btn btn-primary w-sm waves-effect waves-light" id="login" onClick={() => login()} type="button">Unlock</button>
                                            </div>
                
    
                                            <div class="mt-4 text-center">
                                                
                                                <p class="mb-0">Not you ? return <NavLink to={"/login"}><a class="fw-medium txt-primary"> Sign In </a></NavLink></p>
                                                
                                                
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

export default LockScreen;

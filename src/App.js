import React, { useState, useEffect } from 'react';
// import Login from './Login';
import LoginPage from './assets/components/Pages/LoginPage';
import SignUpPage from './assets/components/Pages/SignUpPage';
import LockScreen from './assets/components/Pages/LockScreen';
import RecoverPswd from './assets/components/Pages/RecoverPswd';
import Chat from './Chat';
import client from './feathers';
import SideMenu from './assets/components/sidemenu/SideMenu';
import TopBar from './assets/components/topbar/TopBar';
import Home from './assets/components/Pages/Home';
import Requests from './assets/components/Pages/Requests';
import Products from './assets/components/Pages/Products';
import Blogs from './assets/components/Pages/Blogs';
import Works from './assets/components/Pages/Works';
import OEMs from './assets/components/Pages/OEMs';
import Careers from './assets/components/Pages/Careers';
import Teams from './assets/components/Pages/Teams';
import Events from './assets/components/Pages/Events';
import Admin from './assets/components/Pages/admin';
import Settings from './assets/components/Pages/settings';
import './assets/components/Pages/general.css';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";






const messagesService = client.service('messages');
const usersService = client.service('users');

const Application = () => {
  const [login, setLogin] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  
  const [inactive, setInactive] = useState(false) ;

    useEffect(() => {
      
      // Try to authenticate with the JWT stored in localStorage
      client.authenticate().catch(() => {
        setLogin(null);
      });

    // On successfull login
    client.on('authenticated', loginResult => {
      // Get all users and messages
      // Promise.all([
      //   messagesService.find({
      //     query: {
      //       $sort: { createdAt: -1 },
      //       $limit: 25,
      //     },
      //   }),
      //   usersService.find(),
      // ])
      // window.location.assign("/home");
      // .then(([messagePage, userPage]) => {
      //   // We want the latest messages but in the reversed order
      //   const messagesResult = messagePage.data.reverse();
      //   const usersResult = userPage.data;

      //   // Once both return, update the state
      //   setLogin(loginResult);
      //   setMessages(messagesResult);
      //   setUsers(usersResult);
      // });
    });

    // On logout reset all all local state (which will then show the login screen)
    client.on('logout', () => {
      setLogin(null);
      setMessages([]);
      setUsers([]);
    });

    // // Add new messages to the message list
    // messagesService.on('created', message =>
    //   setMessages(currentMessages => currentMessages.concat(message))
    // );
    // Select.setup();

    // Add new users to the user list
    usersService.on('created', user =>
      setUsers(currentUsers => currentUsers.concat(user))

    );

    



  }, []);

  if (login === undefined) {
    return (
      <main className="container text-center">
        <h1>Loading...</h1>
      </main>
    );
  } else if (login) {
    // console.log(login);
    // return <Chat messages={messages} users={users} />;
    return(
      
      <Router>
      <Routes>
          <Route path={'/'} element={<LockScreen />}/>
          <Route path={'/home'} element={<Home
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/requests'} element={<Requests 
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/products'} element={<Products
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/blogs'} element={<Blogs
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/works'} element={<Works
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/oems'} element={<OEMs
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/careers'} element={<Careers
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/teams'} element={<Teams
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/events'} element={<Events
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/login'} element={<LoginPage
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/admin'} element={<Admin
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/settings'} element={<Settings
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/signup'} element={<SignUpPage
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/login'} element={<LoginPage 
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/signup'} element={<SignUpPage 
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/recover'} element={<RecoverPswd 
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
      </Routes>
    </Router>
    )
  }
  return (
    // <LoginPage />
    <Router>
      <Routes>
          <Route path={'/'} element={<LockScreen />}/>
          <Route path={'/home'} element={<Home
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/requests'} element={<Requests 
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/products'} element={<Products
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/blogs'} element={<Blogs
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/works'} element={<Works
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/oems'} element={<OEMs
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/careers'} element={<Careers
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/teams'} element={<Teams
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/events'} element={<Events
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/login'} element={<LoginPage
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/admin'} element={<Admin
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/settings'} element={<Settings
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/signup'} element={<SignUpPage
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/login'} element={<LoginPage 
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/signup'} element={<SignUpPage 
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
          <Route path={'/recover'} element={<RecoverPswd 
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
            inactiv = {inactive}
          />}/>
      </Routes>
    </Router>
        
  );
  
};

export default Application;

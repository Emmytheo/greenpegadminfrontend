import React, { useEffect, useState } from "react";
import "./sideMenu.css"
import logo from "../../images/greenpegs/logo_dark.png"

import MenuItem from "./MenuItem";


const menuItems = [
    {name: "Home", to: "/home", iconClassName: "bi bi-house-door", active:"true"},
    {name: "Requests", to: "/requests", iconClassName: "bi bi-menu-app", active:"false"},
    {name: "Products", to: "/products", iconClassName: "bi bi-boxes", active:"false"},
    {name: "Blogs", to: "/blogs", iconClassName: "bi bi-newspaper", active:"false"},
    {name: "Works", to: "/works", iconClassName: "bi bi-building", active:"false"},
    {name: "OEMs", to: "/oems", iconClassName: "bi bi-tools", active:"false"},
    {name: "Careers", to: "/careers", iconClassName: "bi bi-person-workspace", active:"false"},
    {name: "Teams", to: "/teams", iconClassName: "bi bi-people", active:"false"},
    {name: "Events", to: "/events", iconClassName: "bi bi-calendar4-event", active:"false"},
    {
        name: null
    },
    {
        name: "Admin", 
        to: '/admin', 
        iconClassName: "bi bi-person",
        active:"false"
    },
    {
        name: "Settings",
        to: '/settings',
        iconClassName: "bi bi-gear",
        active:"false",
        subMenus: [{name: "Accounts", to: "/settings/accounts"},{name: "Options", to: "/settings/options"}],
    },
    
]


const SideMenu = (props) => {
    const [inactive, setInactive] = useState(false);
    

    useEffect(() => {
        if(inactive){
            document.querySelectorAll('.sub-menu').forEach(el => {
                el.classList.remove('active');
            })
        }
    }, [inactive]);
    props.onCollapse(inactive);


    return(
        <div className={`side-menu ${inactive ? "inactive" : ""}`}>
            <div className="top-section">
                <div className="logo">
                    <img src={logo} alt="logo_dark" />
                </div>
                <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
                    { inactive ? 
                    ( <i className="bi bi-list"></i> ) : 
                    (
                        <i className="bi bi-three-dots"></i>
                    )}
                </div>

            </div>
            <div className="main-menu">
                <ul>
                    {
                        menuItems.map((menuItem, index) => {
                            return menuItem.name == null ?
                                <div className="l-break"></div>
                            :
                                <MenuItem 
                                    key={index} 
                                    name={menuItem.name}
                                    to={menuItem.to} 
                                    subMenus={menuItem.subMenus || []} 
                                    iconClassName={menuItem.iconClassName}
                                    onClick={() => {
                                        if(inactive && menuItem.subMenus){
                                            setInactive(false);
                                        }
                                        // if(menuItem.name !== ""){
                                        //     document.querySelectorAll('.menu-item').forEach(el => {
                                        //         el.classList.remove('active');
                                        //     })
                                        //     document.querySelectorAll('.menu-item')[index].classList.add('active');
                                        // }
                                        
                                        
        
        
                                    }}
                                
                                />
                             
                        })
                    }
                    
                </ul>
            </div>
        </div>
    )
}

export default SideMenu;
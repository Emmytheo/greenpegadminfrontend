import React, { useState } from "react";
import SideMenu from "../sidemenu/SideMenu";
import TopBar from "../topbar/TopBar";


const Admin = (props) => {
    const [inactive, setInactive] = useState(props.inactiv) ;
    return (
        <div>
            <SideMenu onCollapse={props.onCollapse} inactiv={props.inactiv} />
            <TopBar 
                status={inactive}
            />
            <div className={`container ${inactive ? 'inactive' : ''}`}>
                <h1>Admin</h1>
            </div>
            
        </div>
        
    )
};

export default Admin;
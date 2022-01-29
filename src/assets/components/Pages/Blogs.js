import React, { useState } from "react";
import SideMenu from "../sidemenu/SideMenu";
import TopBar from "../topbar/TopBar";

const Blogs = (props) => {
    const [inactive, setInactive] = useState(props.inactiv) ;
    return (
        <div>
            <SideMenu onCollapse={props.onCollapse} inactiv={props.inactiv} />
            <TopBar 
                status={props.inactiv}
            />
            <div className={`container ${inactive ? 'inactive' : ''}`}>
                <h1>Blogs</h1>
            </div>
            
        </div>
        
    )
};

export default Blogs;
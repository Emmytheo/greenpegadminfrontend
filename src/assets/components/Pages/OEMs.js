import React, { useState } from "react";
import SideMenu from "../sidemenu/SideMenu";
import TopBar from "../topbar/TopBar";

const OEMs = () => {
    const [inactive, setInactive] = useState(false) ;
    return (
        <div>
            <SideMenu onCollapse={(inactive) => {
                // console.log(inactive);
                setInactive(inactive);
            }} />
            <TopBar 
                status={inactive}
            />
            <div className={`container ${inactive ? 'inactive' : ''}`}>
                <h1>OEMS</h1>
            </div>
            
        </div>
        
    )
};

export default OEMs;
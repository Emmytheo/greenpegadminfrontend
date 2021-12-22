import React, { useState } from "react";
import SideMenu from "../sidemenu/SideMenu";
import TopBar from "../topbar/TopBar";


const Teams = () => {
  const [inactive, setInactive] = useState(false) ;
  return (
      <div>
          <SideMenu onCollapse={(inactive) => {
              setInactive(inactive);
          }} />
          <TopBar 
              status={inactive}
          />
          <div className={`container ${inactive ? 'inactive' : ''}`}>
              <h1>Teams</h1>
          </div>
          
      </div>
      
  )
  };

export default Teams;
import { Menu } from '@headlessui/react'
import "./menubtn.css"

function MenuBtn() {
  return (
    <Menu>
      <Menu.Button className="menubtn"><i className="bi bi-three-dots"></i></Menu.Button>
      <Menu.Items className="menu">
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && 'topbar-drpdwn'}`}
              href="/account-settings"
            >
              <div className='icon'>
                <center>
                  <i className="bi bi-person"></i>
                </center>
                
              </div>
              <div className='content'>
                <center>
                  <p>
                    My Account
                  </p>
                </center>
                
              </div>
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && 'topbar-drpdwn'}`}
              href="/account-settings"
            >
              <div className='icon'>
                <center>
                  <i className="bi bi-box-arrow-left"></i>
                </center>
                
              </div>
              <div className='content'>
                <center>
                  <p>
                    Logout
                  </p>
                </center>
                
              </div>
            </a>
          )}
        </Menu.Item>
        {/* <Menu.Item disabled>
          <span className="opacity-75">Invite a friend (coming soon!)</span>
        </Menu.Item> */}
      </Menu.Items>
    </Menu>
  )
}

export default MenuBtn;
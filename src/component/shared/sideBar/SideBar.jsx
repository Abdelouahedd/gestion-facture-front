import React, {useState} from 'react'
import * as Icon from 'react-feather';
import {Link} from 'react-router-dom';
import {Menu} from 'antd';
import {FileProtectOutlined, UsergroupDeleteOutlined,MoneyCollectOutlined} from '@ant-design/icons';
import './sideBar.css'

const {SubMenu} = Menu;

const SideBar = () => {
    const [user] = useState({
        nom: "Admin",
        prenom: "ADMIN",
        email: "admin@gmail.com"
    });
    return (
        <div id="layoutSidenav_nav">
            <nav className="sidenav shadow-right sidenav-light">
                <div className="sidenav-menu">
                    <div className="nav accordion" id="accordionSidenav">
                        <Menu
                            style={{ height: '70%', marginTop: 20, overflowY: "hidden" }}
                            defaultOpenKeys={['dash']}
                            mode="inline"
                            className="sidenav-menu-heading"
                            aria-orientation="vertical"
                        >
                            <Menu.Item key="dash" icon={<Icon.Activity size={20} />} >
                                <Link to="/">
                                    DashBord
                            </Link>
                            </Menu.Item>
                            <SubMenu key="users"
                                icon={<UsergroupDeleteOutlined style={{ fontSize: '22px' }} />}
                                title="Gestion des utilisateur"
                            >
                                <Menu.ItemGroup key="g1" title="Client" >
                                    <Menu.Item key="1">
                                        <Link to="/list-client">
                                            <i className="fa fa-users px-2" aria-hidden="true"/>
                                            List des clients
                                    </Link>
                                    </Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>
                          <SubMenu key="factures"
                                   icon={<FileProtectOutlined  style={{ fontSize: '22px' }}/>}
                                   title="Gestion des factures"
                          >
                            <Menu.ItemGroup key="g2" title="Factures" >
                              <Menu.Item key="2">
                                <Link to="/list-facture">
                                  <i className="fa fa-file-invoice-dollar px-2" aria-hidden="true"/>
                                  List des factures
                                </Link>
                              </Menu.Item>
                            </Menu.ItemGroup>
                          </SubMenu>
                          <SubMenu key="payment"
                                   icon={<MoneyCollectOutlined   style={{ fontSize: '22px' }}/>}
                                   title="Gestion des payments"
                          >
                            <Menu.ItemGroup key="g3" title="Payment" >
                              <Menu.Item key="3">
                                <Link to="/list-payment">
                                  <i className="fa fa-money-check-alt px-2" aria-hidden="true"/>
                                  List des payments
                                </Link>
                              </Menu.Item>
                            </Menu.ItemGroup>
                          </SubMenu>
                        </Menu>
                    </div>
                </div>

        <div className="sidenav-footer">
          <div className="sidenav-footer-content">
            <div className="sidenav-footer-subtitle">Logged in as:</div>
            <div className="sidenav-footer-title">{user.nom + " " + user.prenom}</div>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default SideBar

import React, { useState, useContext } from 'react'
import * as Icon from 'react-feather';
import { Link, useHistory } from 'react-router-dom';
import { Context } from "../../../context/userContext"
import { logout } from "../../../context/actions/userActions"
const Header = () => {
    const { dispatch } = useContext(Context)
    const [user] = useState({
        nom: "Admin",
        prenom: "ADMIN",
        email: "admin@gmail.com"
    });

    const history = useHistory();

    const logOut = async () => {
        await window.localStorage.clear();
        await dispatch(logout())
        history.push("/login");
    }

    return (
        <>
            <nav className="topnav navbar navbar-expand shadow navbar-light bg-white" id="sidenavAccordion">
                <Link className="navbar-brand" to="/">Gestion facturations</Link>
                <button className="btn btn-icon btn-transparent-dark order-1 order-lg-0 mr-lg-2" id="sidebarToggle"
                    href="#">
                    <Icon.Menu size={15} />
                </button>
                <form className="form-inline mr-auto d-none d-md-block">
                    <div className="input-group input-group-joined input-group-solid">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <Icon.Search size={15} />
                            </div>
                        </div>
                    </div>
                </form>
                <ul className="navbar-nav align-items-center ml-auto">
                    <li className="nav-item dropdown no-caret mr-3 d-md-none">
                        <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="searchDropdown" href="/"
                            role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <Icon.Search size={15} />
                        </a>
                        {/* <!-- Dropdown - Search--> */}
                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--fade-in-up"
                            aria-labelledby="searchDropdown">
                            <form className="form-inline mr-auto w-100">
                                <div className="input-group input-group-joined input-group-solid">
                                    <input className="form-control" type="text" placeholder="Search for..."
                                        aria-label="Search" aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <Icon.Search />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>
                    <li className="nav-item dropdown no-caret mr-3 dropdown-notifications">
                        <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownAlerts"
                            href="/" role="button" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                            <Icon.Bell size={15} />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up"
                            aria-labelledby="navbarDropdownAlerts">
                            <h6 className="dropdown-header dropdown-notifications-header">
                                <Icon.Bell className="mr-2" size={15} />
                            Alerts Center
                        </h6>
                            <a className="dropdown-item dropdown-notifications-item" href="#!">
                                <div className="dropdown-notifications-item-icon bg-warning">
                                    <Icon.Activity size={15} />
                                </div>
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-details">December 29, 2019</div>
                                    <div className="dropdown-notifications-item-content-text">This is an alert message.
                                    It&apos;s nothing serious, but it requires your attention.
                                </div>
                                </div>
                            </a>
                            <a className="dropdown-item dropdown-notifications-item" href="#!">
                                <div className="dropdown-notifications-item-icon bg-info">
                                    <Icon.BarChart size={15} />
                                </div>
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-details">December 22, 2019</div>
                                    <div className="dropdown-notifications-item-content-text">A new monthly report is
                                    ready.
                                    Click here to view!
                                </div>
                                </div>
                            </a>
                            <a className="dropdown-item dropdown-notifications-item" href="#!">
                                <div className="dropdown-notifications-item-icon bg-danger">
                                    <i className="fas fa-exclamation-triangle"></i></div>
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-details">December 8, 2019</div>
                                    <div className="dropdown-notifications-item-content-text">Critical system failure,
                                    systems shutting down.
                                </div>
                                </div>
                            </a>
                            <a className="dropdown-item dropdown-notifications-item" href="#!">
                                <div className="dropdown-notifications-item-icon bg-success">
                                    <Icon.UserPlus size={15} />
                                </div>
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-details">December 2, 2019</div>
                                    <div className="dropdown-notifications-item-content-text">New user request. Woody
                                    has
                                    requested access to the organization.
                                </div>
                                </div>
                            </a>
                            <a className="dropdown-item dropdown-notifications-footer" href="#!">View All Alerts</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown no-caret mr-3 dropdown-notifications">
                        <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownMessages"
                            href="/" role="button" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                            <Icon.Mail size={15} />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up"
                            aria-labelledby="navbarDropdownMessages">
                            <h6 className="dropdown-header dropdown-notifications-header">
                                <Icon.Mail className="mr-2" size={15} />
                            Message Center
                        </h6>
                            <a className="dropdown-item dropdown-notifications-item" href="#!">
                                <img className="dropdown-notifications-item-img"
                                    src="https://source.unsplash.com/vTL_qy03D1I/60x60" alt="drop down" />
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-text">Lorem ipsum dolor sit
                                    amet,
                                    consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                    dolore
                                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                                    in
                                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                                    occaecat
                                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                    laborum.
                                </div>
                                    <div className="dropdown-notifications-item-content-details">Emily Fowler &#xB7; 58m
                                </div>
                                </div>
                            </a>
                            <a className="dropdown-item dropdown-notifications-item" href="#!">
                                <img className="dropdown-notifications-item-img"
                                    src="https://source.unsplash.com/4ytMf8MgJlY/60x60" alt="drop down" />
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-text">Lorem ipsum dolor sit
                                    amet,
                                    consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                    dolore
                                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                                    in
                                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                                    occaecat
                                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                    laborum.
                                </div>
                                    <div className="dropdown-notifications-item-content-details">Diane
                                    Chambers &#xB7; 2d
                                </div>
                                </div>
                            </a>
                            <a className="dropdown-item dropdown-notifications-footer" href="#!">Read All Messages</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown no-caret mr-2 dropdown-user">
                        <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage"
                            href="/" role="button" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                            <div className="avatar avatar-xxl">
                                <img className="avatar-img img-fluid"
                                    src="https://source.unsplash.com/QAB-WJcbgJk/60x60" alt="drop down" />
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up"
                            aria-labelledby="navbarDropdownUserImage">
                            <h6 className="dropdown-header d-flex align-items-center">
                                <img className="dropdown-user-img" src="https://source.unsplash.com/QAB-WJcbgJk/60x60"
                                    alt="drop down" />
                                <div className="dropdown-user-details">
                                    <div className="dropdown-user-details-name">{user.nom + " " + user.prenom}</div>
                                    <div className="dropdown-user-details-email">{user.email}</div>
                                </div>
                            </h6>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#!">
                                <div className="dropdown-item-icon">
                                    <Icon.Settings size={15} />
                                </div>
                            Account
                        </a>
                            <a className="dropdown-item" href="#!" onClick={logOut}>
                                <div className="dropdown-item-icon">
                                    <Icon.LogOut size={15} />
                                </div>
                            Logout
                        </a>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Header
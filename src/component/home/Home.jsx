import React, { useEffect } from 'react'
import Routes from '../../routes/Routes';
import Header from "../shared/header/Header";
import SideBar from '../shared/sideBar/SideBar';


export const Home = () => {
    //show and hide side bar
    const toggelSideBar = () => {
        document.querySelector('body').classList.toggle('sidenav-toggled')
    }
    //add event listener to id of side bar
    useEffect(() => {
        document.getElementById("sidebarToggle").addEventListener('click', toggelSideBar)
    }, []);
    return (
        <div>
            <Header />
            <div id="layoutSidenav">
                <SideBar />
                <Routes />
            </div>
        </div>
    )
}
export default Home

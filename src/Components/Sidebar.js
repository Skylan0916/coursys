import '../App.css';
import React from 'react';
import { SidebarData } from '../data/Sidebar';
import logo from '../data/Logo.png';

function Sidebar() {
    return (
        <div className="Sidebar">

            <img src={logo} id="logo"/>

            <ul className="SidebarList">
                {SidebarData.map((val, key) => {
                    return (
                        <li
                            key={key}
                            className="row"
                            id={window.location.pathname == val.link ? "active" : ""}
                            onClick={() => { window.location.pathname = val.link }}>
                            <div id="icon">
                                {val.icon}
                            </div>
                            <div id="title">
                                {val.title}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Sidebar;
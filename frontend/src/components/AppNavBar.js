import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";

function AppNavBar(props) {

    const [isAlreadyLogin, setIsAlreadyLogin] = useState(false);

    useEffect(() => {
        axios.get('/isAlreadyLogin')
            .then(response => {
                let resultCode = response.data.resultCode;
                if (resultCode > 0) {
                    setIsAlreadyLogin(true);
                } else {
                    setIsAlreadyLogin(false);
                }
            })
            .catch(error => {
                setIsAlreadyLogin(false);
                console.log(error);
            });
    }, []);

    function signOut() {
        axios.get('/signOut')
            .then(response => {
                console.log(response.data.resultText);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (<div className={`navbar is-fixed-top has-shadow-1 menu-panel ${isAlreadyLogin ? '' : 'is-hidden'}`}>
        <div className="navbar-menu">
            <div className="navbar-start">
                <Link className="navbar-item" to={{
                    pathname: '/Home',
                    state: { detail: props.userOwnerInfo }
                }}>Home</Link>
                <Link className="navbar-item" to="/Contacts">Contacts</Link>
                <Link className="navbar-item" to="/Category">Category</Link>
                <Link className="navbar-item" to="/CreateNewContact">Create New Contact</Link>
            </div>
            <div className="navbar-end">
                <div className="navbar-item is-hoverable has-dropdown account-name-panel">
                    <a className="navbar-link">
                        <div>{props !== undefined && props.userOwnerInfo !== undefined? props.userOwnerInfo.name : "undefined"}</div>
                    </a>
                    <div className="navbar-dropdown">
                        <Link className="navbar-item" to={{
                            pathname: '/SignUp',
                            state: { detail: props.userOwnerInfo }
                        }}>profile info</Link>
                        <Link className="navbar-item" onClick={signOut} to="/">Sign out</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>);

}

export default AppNavBar;
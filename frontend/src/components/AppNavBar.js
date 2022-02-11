import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {UserContext} from "../context/UserContext";
import defaultImage from "../static/user-male.svg";
import {toast} from "react-toastify";

function AppNavBar(props) {

    const [isAlreadyLogin, setIsAlreadyLogin] = useState(false);
    const [userContext, setUserContext] = useContext(UserContext);

    useEffect(() => {
        axios.get('/isAlreadyLogin')
            .then(response => {
                let resultCode = response.data.resultCode;
                if (resultCode > 0) {
                    setIsAlreadyLogin(true);
                } else {
                    setIsAlreadyLogin(false);
                    setUserContext(null);
                }
            })
            .catch(error => {
                toast.error("A bad request was received.");
                setIsAlreadyLogin(false);
                console.log(error);
            });
    }, []);

    function signOut() {
        axios.get('/signOut')
            .then(response => {
                console.log(response.data.resultText);
                setUserContext(null);
            })
            .catch(error => {
                toast.error("A bad request was received.");
                console.log(error);
            });
    }

    return (<div className="hero-head">
        <div className={`navbar ${isAlreadyLogin ? '' : 'is-hidden'}`}>
            <div className="container">
                <div className="navbar-menu">
                    <Link className="navbar-item" to={{
                        pathname: '/Home'
                    }}>Home</Link>
                    <Link className="navbar-item" to="/Contacts">Contacts</Link>
                    <Link className="navbar-item" to="/Category">Category</Link>
                    <Link className="navbar-item" to="/CreateNewContact">Create New Contact</Link>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item is-hoverable has-dropdown account-name-panel">
                        <a className="navbar-link">
                            <span className="image is-32x32 mr-2">
                                <img className="is-rounded" src={defaultImage}/>
                            </span>
                            <span>{userContext && userContext !== undefined ? userContext.name : "undefined"}</span>
                        </a>
                        <div className="navbar-dropdown has-background-light has-text-black-ter">
                            <Link className="navbar-item" to={{
                                pathname: '/SignUp'
                            }}>profile info</Link>
                            <Link className="navbar-item" onClick={signOut} to="/">Sign out</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);

}

export default AppNavBar;
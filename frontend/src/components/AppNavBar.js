import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class AppNavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isHiddenNav } = this.props;
        return <div className={`navbar is-fixed-top has-shadow-1 menu-panel ${isHiddenNav ? 'is-hidden' : ''}`}>
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/Home">Home</Link>
                    <Link className="navbar-item" to="/Contacts">Contacts</Link>
                    <Link className="navbar-item" to="/Category">Category</Link>
                    <Link className="navbar-item" to="/CreateNewContact">Create New
                        Contact</Link>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item is-hoverable has-dropdown">
                        <a className="navbar-link">
                            <div>mouck name</div>
                        </a>
                        <div className="navbar-dropdown">
                            <Link className="navbar-item" to="/SignUp">profile info</Link>
                            <Link className="navbar-item" to="/">Sign out</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}
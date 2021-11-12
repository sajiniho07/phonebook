import React, {Component} from "react";
import {Link} from "react-router-dom";

class LoginPage extends Component {

    render() {
        return (
            <div className="hero is-primary full-height">
                <div className="hero-body">
                    <h1 className="title has-text-centered is-size-2">Sign in to Phonebook</h1>
                    <div className="columns is-centered">
                        <div className="column is-half">
                            <div className="notification is-light">
                                <div className="field">
                                    <label className="label">Username or Email</label>
                                    <p className="control has-icons-left has-icons-right">
                                        <input className="input" placeholder="Username" name="username"/>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                    </p>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <p className="control has-icons-left">
                                        <input className="input" placeholder="Password" type="password"
                                               name="password"/>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                    </p>
                                </div>
                                <div className="is-flex-column-center">
                                    <div className="field">
                                        <p className="control">
                                            <Link className="button is-success" to="/signIn">Sign in</Link>
                                        </p>
                                    </div>
                                    <div className="is-flex-row-start">
                                        <span>Don't have an account?</span>
                                        <Link className="button is-text" to="/signUp">Sign Up</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
import React, {Component} from "react";

class SignUp extends Component {

    render() {
        return (<div className="hero is-primary full-height">
                <div className="hero-body">
                    <h1 className="title has-text-centered is-size-2">Creat an account</h1>
                    <div className="columns is-centered">
                        <div className="column is-half">
                            <div className="notification is-light">
                                <div className="field">
                                    <label className="label">Name</label>
                                    <div className="control">
                                        <input className="input" placeholder="Ex. Ralf" name="name"/>
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Username</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input className="input" placeholder="Ex. Ralf_45" name="username"/>
                                        <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                                    </div>
                                    <p className="help is-success is-hidden">This username is available</p>
                                    <p className="help is-danger is-hidden">This username is invalid.</p>
                                </div>

                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input className="input" placeholder="Password" name="password"/>
                                        <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                                    </div>
                                    <p className="help is-danger is-hidden">This password is invalid.</p>
                                </div>

                                <div className="field">
                                    <label className="label">Repeat Password</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input className="input" placeholder="Password" id="reenteredpassword"/>
                                        <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                                    </div>
                                    <p className="help is-danger is-hidden">The password does not match.</p>
                                </div>

                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input className="input" placeholder="Ex. abc@gmail.com" type="email"
                                               name="email"/>
                                        <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                                    </div>
                                    <p className="help is-danger is-hidden">This email is invalid.</p>
                                </div>

                                <div className="field is-grouped">
                                    <div className="control">
                                        <a id="btnSubmit" className="button is-primary"
                                           onClick="myFunction()">Submit</a>
                                    </div>
                                    <div className="control">
                                        <a className="button is-primary is-light" href="">Cancel</a>
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

export default SignUp;
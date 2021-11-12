import React, {Component} from "react";
import {Link} from "react-router-dom";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            Password: "",
            repeatPassword: "",
            email: ""
        };
     //  const [formData, setformData] = useState({ name: null, mobile: null, majorId: 0 });
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, username, Password, repeatPassword, email } = e.target;


    }

    handleSubmit() {
        console.log(this.state);
    }

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
                                        <input className="input" placeholder="Ex. Ralf" value={this.state.name}
                                               name="name" onChange={this.handleChange} />
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Username</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input className="input" placeholder="Ex. Ralf_45" name="username"
                                               value={this.state.username} onChange={this.handleChange} />
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
                                        <input className="input" placeholder="Password" name="password"
                                               value={this.state.password} onChange={this.handleChange} />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                    </div>
                                    <p className="help is-danger is-hidden">This password is invalid.</p>
                                </div>

                                <div className="field">
                                    <label className="label">Repeat Password</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input className="input" placeholder="Password"
                                               value={this.state.repeatPassword} onChange={this.handleChange}/>
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
                                               name="email" onChange={this.handleChange} value={this.state.email}/>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                    </div>
                                    <p className="help is-danger is-hidden">This email is invalid.</p>
                                </div>

                                <div className="field is-grouped">
                                    <div className="control">
                                        <a className="button is-primary" onClick={this.handleSubmit}>Submit</a>
                                    </div>
                                    <div className="control">
                                        <Link className="button is-primary is-light" to="/">Cancel</Link>
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
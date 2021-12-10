import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import qs from "qs";
import StringHelper from "../helper/StringHelper";
import {toast, ToastContainer} from "react-toastify";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            password: "",
            repeatPassword: "",
            email: "",
            isLoading: false,
            isNameValid: true,
            isUserNameValid: true,
            isEmailValid: true,
            isPasswordValid: true,
            isRepeatPasswordValid: true,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit() {
        let isValid = this.validation();
        if (isValid) {
            this.signUp();
        }
    }

    setLoading(isLoading) {
        this.setState({isLoading: isLoading});
    }

    validation() {
        let stringHelper = new StringHelper();
        let isValid = true;
        let formData = this.state;
        if (!formData.name) {
            isValid = false;
            this.setState({isNameValid: false});
        } else {
            this.setState({isNameValid: true});
        }
        if (!stringHelper.checkValidateUsername(formData.username)) {
            isValid = false;
            this.setState({isUserNameValid: false});
        } else {
            this.setState({isUserNameValid: true});
        }
        if (!stringHelper.checkValidatePassword(formData.password)) {
            isValid = false;
            this.setState({isPasswordValid: false});
        } else if (formData.password !== formData.repeatPassword) {
            isValid = false;
            this.setState({isPasswordValid: true});
            this.setState({isRepeatPasswordValid: false});
        } else {
            this.setState({isPasswordValid: true});
            this.setState({isRepeatPasswordValid: true});
        }
        if (!stringHelper.checkValidateEmail(formData.email)) {
            isValid = false;
            this.setState({isEmailValid: false});
        } else {
            this.setState({isEmailValid: true});
        }
        return isValid;
    }

    signUp() {
        this.setLoading(true);
        let formData = this.state;
        axios.post('/signUp',
            qs.stringify(
                {
                    name: formData.name,
                    password: formData.password,
                    email: formData.email,
                    username: formData.username
                }))
            .then(response => {
                this.setLoading(false);
                let resultCode = response.data.resultCode;
                if (resultCode > 0) {
                    toast.success('User sign up succeed.');
                    this.props.history.push('/Home')
                } else {
                    toast.error(response.data.resultText);
                }
            })
            .catch(error => {
                this.setLoading(false);
                console.log(error);
            });
    }

    render() {
        return (<>
                <div className="hero is-primary full-height">
                    <div className="hero-body">
                        <h1 className="title has-text-centered is-size-2">Creat an account</h1>
                        <div className="columns is-centered">
                            <div className="column is-half">
                                <div className="notification is-light">
                                    <div className="field">
                                        <label className="label">Name</label>
                                        <div className="control">
                                            <input className={`input ${this.state.isNameValid ? '' : 'is-danger'}`}
                                                   placeholder="Ex. Ralf" value={this.state.name}
                                                   name="name" onChange={this.handleChange}/>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Username</label>
                                        <div className="control has-icons-left has-icons-right">
                                            <input className={`input ${this.state.isUserNameValid ? '' : 'is-danger'}`}
                                                   placeholder="Ex. Ralf_45" name="username"
                                                   value={this.state.username} onChange={this.handleChange}/>
                                            <span className="icon is-small is-left">
                                            <i className="fas fa-user"></i>
                                        </span>
                                        </div>
                                        <p className={`help is-danger ${this.state.isUserNameValid ? 'is-hidden' : ''}`}>
                                            The username must be between 4 and 15 characters long.
                                        </p>
                                    </div>

                                    <div className="field">
                                        <label className="label">Password</label>
                                        <div className="control has-icons-left has-icons-right">
                                            <input className={`input ${this.state.isPasswordValid ? '' : 'is-danger'}`}
                                                   placeholder="Password" name="password"
                                                   value={this.state.password} onChange={this.handleChange}/>
                                            <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                        </div>
                                        <p className={`help is-danger ${this.state.isPasswordValid ? 'is-hidden' : ''}`}>
                                            The password must be between 6 and 20 characters long.
                                        </p>
                                    </div>

                                    <div className="field">
                                        <label className="label">Repeat Password</label>
                                        <div className="control has-icons-left has-icons-right">
                                            <input
                                                className={`input ${this.state.isRepeatPasswordValid ? '' : 'is-danger'}`}
                                                placeholder="Password" name="repeatPassword"
                                                value={this.state.repeatPassword} onChange={this.handleChange}/>
                                            <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                        </div>
                                        <p className={`help is-danger ${this.state.isRepeatPasswordValid ? 'is-hidden' : ''}`}>
                                            It doesn't match the repeated password.
                                        </p>
                                    </div>

                                    <div className="field">
                                        <label className="label">Email</label>
                                        <div className="control has-icons-left has-icons-right">
                                            <input className={`input ${this.state.isEmailValid ? '' : 'is-danger'}`}
                                                   placeholder="Ex. abc@gmail.com" type="email"
                                                   name="email" onChange={this.handleChange} value={this.state.email}/>
                                            <span className="icon is-small is-left">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                        </div>
                                        <p className={`help is-danger ${this.state.isEmailValid ? 'is-hidden' : ''}`}>
                                            This email is invalid.
                                        </p>
                                    </div>

                                    <div className="field is-grouped">
                                        <div className="control">
                                            <a className={`button is-primary ${this.state.isLoading ? 'is-loading' : ''}`}
                                               onClick={this.handleSubmit}>Submit</a>
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
                <ToastContainer/>
            </>
        );
    }
}

export default SignUp;
import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import qs from "qs";
import {toast} from "react-toastify";

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isLoading: false
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
        this.signIn();
    }

    setLoading(isLoading) {
        this.setState({isLoading: isLoading});
    }

    signIn() {
        this.setLoading(true);
        let formData = this.state;
        axios.post('/signIn',
            qs.stringify(
                {
                    password: formData.password,
                    username: formData.username
                }))
            .then(response => {
                this.setLoading(false);
                let resultCode = response.data.resultCode;
                if (resultCode > 0) {
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
                                        <input className="input" placeholder="Username" name="username"
                                               value={this.state.username} onChange={this.handleChange}/>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                    </p>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <p className="control has-icons-left">
                                        <input className="input" placeholder="Password" type="password"
                                               name="password" value={this.state.password} onChange={this.handleChange}/>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                    </p>
                                </div>
                                <div className="is-flex-column-center">
                                    <div className="field">
                                        <p className="control">
                                            <a className={`button is-success ${this.state.isLoading ? 'is-loading' : ''}`}
                                               onClick={this.handleSubmit}>Sign in</a>
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
import React, {useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import qs from "qs";
import StringHelper from "../helper/StringHelper";
import {toast} from "react-toastify";
import AppNavBar from "./AppNavBar";
import {UserContext} from "../context/UserContext";

function SignUp(props) {
    const [userContext, setUserContext] = useContext(UserContext);
    const [state, setState] = React.useState({
        _id: "",
        name: "",
        username: "",
        password: "",
        repeatPassword: "",
        email: ""
    });

    const [isNameValid, setIsNameValid] = React.useState(true);
    const [isUserNameValid, setIsUserNameValid] = React.useState(true);
    const [isPasswordValid, setIsPasswordValid] = React.useState(true);
    const [isRepeatPasswordValid, setIsRepeatPasswordValid] = React.useState(true);
    const [isEmailValid, setIsEmailValid] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        if (userContext) {
            setState({
                ...state,
                _id: userContext.id,
                name: userContext.name,
                username: userContext.username,
                email: userContext.email
            });
        }
    }, []);

    function handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setState({
            ...state,
            [name]: value
        });

    }

    function handleSubmit() {
        let isValid = validation();
        if (isValid) {
            signUp();
        }
    }

    function validation() {
        let stringHelper = new StringHelper();
        let isValid = true;
        let formData = state;
        if (!formData.name) {
            isValid = false;
            setIsNameValid(false);
        } else {
            setIsNameValid(true);
        }
        if (!stringHelper.checkValidateUsername(formData.username)) {
            isValid = false;
            setIsUserNameValid(false);
        } else {
            setIsUserNameValid(true);
        }
        if (!stringHelper.checkValidatePassword(formData.password)) {
            isValid = false;
            setIsPasswordValid(false);
        } else if (formData.password !== formData.repeatPassword) {
            isValid = false;
            setIsPasswordValid(true);
            setIsRepeatPasswordValid(false);
        } else {
            setIsPasswordValid(true);
            setIsRepeatPasswordValid(true);
        }
        if (!stringHelper.checkValidateEmail(formData.email)) {
            isValid = false;
            setIsEmailValid(false);
        } else {
            setIsEmailValid(true);
        }
        return isValid;
    }

    function signUp() {
        setIsLoading(true);
        axios.post('/signUp',
            qs.stringify(
                {
                    name: state.name,
                    password: state.password,
                    email: state.email,
                    username: state.username
                }))
            .then(response => {
                setIsLoading(false);
                let resultCode = response.data.resultCode;
                if (resultCode > 0) {
                    toast.success(response.data.resultText);
                    setUserContext(response.data);
                    props.history.push({
                        pathname: '/Home'
                    });
                } else {
                    toast.error(response.data.resultText);
                }
            })
            .catch(error => {
                toast.error("A bad request was received.");
                setIsLoading(false);
                console.log(error);
            });
    }

    return (<>
            <AppNavBar/>
            <div className="hero-body">
                <h1 className="title has-text-centered is-size-2">{state._id ? 'Update user information' : 'Create an account'}</h1>
                <div className="columns is-centered">
                    <div className="column is-half">
                        <div className="notification is-light">
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input className={`input ${isNameValid ? '' : 'is-danger'}`}
                                           placeholder="Ex. Ralf" value={state.name}
                                           name="name" onChange={handleChange}/>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Username</label>
                                <div className="control has-icons-left">
                                    <input className={`input ${isUserNameValid ? '' : 'is-danger'}`}
                                           placeholder="Ex. Ralf_45" name="username"
                                           value={state.username} onChange={handleChange}/>
                                    <span className="icon is-small is-left">
                                            <i className="fas fa-user"></i>
                                        </span>
                                </div>
                                <p className={`help is-danger ${isUserNameValid ? 'is-hidden' : ''}`}>
                                    The username must be between 4 and 15 characters long.
                                </p>
                            </div>

                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control has-icons-left">
                                    <input className={`input ${isPasswordValid ? '' : 'is-danger'}`}
                                           placeholder="Password" name="password" type="password"
                                           value={state.password} onChange={handleChange}/>
                                    <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                </div>
                                <p className={`help is-danger ${isPasswordValid ? 'is-hidden' : ''}`}>
                                    The password must be between 6 and 20 characters long.
                                </p>
                            </div>

                            <div className="field">
                                <label className="label">Repeat Password</label>
                                <div className="control has-icons-left">
                                    <input
                                        className={`input ${isRepeatPasswordValid ? '' : 'is-danger'}`}
                                        placeholder="Password" name="repeatPassword" type="password"
                                        value={state.repeatPassword} onChange={handleChange}/>
                                    <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                </div>
                                <p className={`help is-danger ${isRepeatPasswordValid ? 'is-hidden' : ''}`}>
                                    It doesn't match the repeated password.
                                </p>
                            </div>

                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control has-icons-left">
                                    <input className={`input ${isEmailValid ? '' : 'is-danger'}`}
                                           placeholder="Ex. abc@gmail.com" type="email"
                                           name="email" onChange={handleChange} value={state.email}/>
                                    <span className="icon is-small is-left">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                </div>
                                <p className={`help is-danger ${isEmailValid ? 'is-hidden' : ''}`}>
                                    This email is invalid.
                                </p>
                            </div>

                            <div className="field is-grouped">
                                <div className="control">
                                    <a className={`button is-success ${isLoading ? 'is-loading' : ''}`}
                                       onClick={handleSubmit}>Submit</a>
                                </div>
                                <div className="control">
                                    <Link className="button is-success is-light"
                                          to={`${state._id ? '/Home' : '/'}`}>Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
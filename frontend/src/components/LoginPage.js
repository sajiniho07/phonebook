import React, {useContext} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import qs from "qs";
import {toast} from "react-toastify";
import {UserContext} from "../context/UserContext";

function LoginPage(props) {

    const [userContext, setUserContext] = useContext(UserContext);
    const [state, setState] = React.useState({
        username: "",
        password: ""
    });
    const [isLoading, setIsLoading] = React.useState(false);

    function handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setState({
            ...state,
            [name]: value
        });
    }

    function signIn() {
        setIsLoading(true);
        axios.post('/signIn',
            qs.stringify(
                {
                    password: state.password,
                    username: state.username
                }))
            .then(response => {
                setIsLoading(false);
                let resultCode = response.data.resultCode;
                if (resultCode > 0) {
                    setUserContext(response.data);
                    props.history.push({
                        pathname: '/Home'
                    });
                } else {
                    toast.error(response.data.resultText);
                }
            })
            .catch(error => {
                setIsLoading(false);
                console.log(error);
            });
    }

    return (
        <>
            <div className="hero-body">
                <h1 className="title has-text-centered is-size-2">Sign in to Phonebook</h1>
                <div className="columns is-centered">
                    <div className="column is-half">
                        <div className="notification is-light">
                            <div className="field">
                                <label className="label">Username or Email</label>
                                <p className="control has-icons-left has-icons-right">
                                    <input className="input" placeholder="Username" name="username"
                                           value={state.username} onChange={handleChange}/>
                                    <span className="icon is-small is-left">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                </p>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <p className="control has-icons-left">
                                    <input className="input" placeholder="Password" type="password"
                                           name="password" value={state.password} onChange={handleChange}/>
                                    <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                </p>
                            </div>
                            <div className="is-flex-column-center">
                                <div className="field">
                                    <p className="control">
                                        <a className={`button is-success ${isLoading ? 'is-loading' : ''}`}
                                           onClick={signIn}>Sign in</a>
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
        </>
    );
}

export default LoginPage;
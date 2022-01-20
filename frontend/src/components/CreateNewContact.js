import React, {useEffect} from "react";
import AppNavBar from "./AppNavBar";
import {Link, useLocation} from "react-router-dom";
import {toast} from "react-toastify";
import StringHelper from "../helper/StringHelper";
import axios from "axios";
import qs from "qs";

function CreateNewContact(props) {

    const [state, setState] = React.useState({
        _id: "",
        name: "",
        email: "",
        phoneNumber: "",
        numberType: "",
        facebook: "",
        twitter: "",
        isMarked: false,
        categoryName: "",
        photoData: ""
    });

    const [isNameValid, setIsNameValid] = React.useState(true);
    const [isEmailValid, setIsEmailValid] = React.useState(true);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = React.useState(true);
    const [isFacebookValid, setIsFacebookValid] = React.useState(true);
    const [isTwitterValid, setIsTwitterValid] = React.useState(true);

    const [isLoading, setIsLoading] = React.useState(false);

    const location = useLocation();
    useEffect(() => {
        let detail = !location.state ? "" : location.state.detail;
        if (detail) {
            setState({
                ...state,
                _id: detail.id,
                name: detail.name,
                email: detail.email,
                phoneNumber: detail.phoneNumber,
                facebook: detail.facebook,
                twitter: detail.twitter,
                categoryName: detail.categoryName,
                isMarked: detail.isMarked,
                photoData: detail.photoData,
                numberType: detail.numberType
            });
        }
    }, [location]);

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
            contactInsertOrUpdate();
        }
    }

    function contactInsertOrUpdate() {
        setIsLoading(true);
        axios.post('/contactInsertOrUpdate',
            qs.stringify(
                {
                    contactId: state._id,
                    name: state.name,
                    email: state.email,
                    phoneNumber: state.phoneNumber,
                    facebook: state.facebook,
                    twitter: state.twitter,
                    categoryName: state.categoryName,
                    isMarked: false,
                    numberType: 'numberType_moqe',
                    photoData: 'photoData_moqe'
                }))
            .then(response => {
                setIsLoading(false);
                let resultCode = response.data.resultCode;
                if (resultCode > 0) {
                    toast.success(response.data.resultText);
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

    function validation() {
        let stringHelper = new StringHelper();
        let isValid = true;
        if (!state.name) {
            isValid = false;
            setIsNameValid(false);
        } else {
            setIsNameValid(true);
        }
        if (state.email && !stringHelper.checkValidateEmail(state.email)) {
            isValid = false;
            setIsEmailValid(false);
        } else {
            setIsEmailValid(true);
        }
        if (!stringHelper.checkValidateNumber(state.phoneNumber)) {
            isValid = false;
            setIsPhoneNumberValid(false);
        } else {
            setIsPhoneNumberValid(true);
        }
        if (state.facebook && !stringHelper.checkValidateFacebook(state.facebook)) {
            isValid = false;
            setIsFacebookValid(false);
        } else {
            setIsFacebookValid(true);
        }
        if (state.twitter && !stringHelper.checkValidateTwitter(state.twitter)) {
            isValid = false;
            setIsTwitterValid(false);
        } else {
            setIsTwitterValid(true);
        }
        return isValid;
    }

    return (<>
            <AppNavBar/>
            <div className="hero-body">
                <h1 className="title has-text-centered is-size-2">{state._id ? 'Update contact' : 'Create new contact'}</h1>
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
                                <label className="label">Phone Number</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input className={`input ${isPhoneNumberValid ? '' : 'is-danger'}`}
                                           placeholder="Ex. 98902799" name="phoneNumber"
                                           value={state.phoneNumber} onChange={handleChange}/>
                                    <span className="icon is-small is-left">
                                            <i className="fas fa-mobile"></i>
                                        </span>
                                </div>
                                <p className={`help is-danger ${isPhoneNumberValid ? 'is-hidden' : ''}`}>
                                    The phone number is invalid.
                                </p>
                            </div>

                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input className={`input ${isEmailValid ? '' : 'is-danger'}`}
                                           placeholder="Ex. abc@gmail.com" type="email"
                                           name="email" onChange={handleChange} value={state.email}/>
                                    <span className="icon is-small is-left">
                                            <i className="fas fa-envelope"></i>
                                        terst
                                        </span>
                                </div>
                                <p className={`help is-danger ${isEmailValid ? 'is-hidden' : ''}`}>
                                    This email is invalid.
                                </p>
                            </div>

                            <div className="field">
                                <label className="label">Facebook</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input className={`input ${isFacebookValid ? '' : 'is-danger'}`}
                                           placeholder="Ex. https://facebook.com/sample.acc" name="facebook"
                                           value={state.facebook} onChange={handleChange}/>
                                    <span className="icon is-small is-left">
                                            <i className="fab fa-facebook"></i>
                                        </span>
                                </div>
                                <p className={`help is-danger ${isFacebookValid ? 'is-hidden' : ''}`}>
                                    The facebook account is invalid.
                                </p>
                            </div>

                            <div className="field">
                                <label className="label">Twitter</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input
                                        className={`input ${isTwitterValid ? '' : 'is-danger'}`}
                                        placeholder="Ex. @example" name="twitter"
                                        value={state.twitter} onChange={handleChange}/>
                                    <span className="icon is-small is-left">
                                            <i className="fab fa-twitter"></i>
                                        </span>
                                </div>
                                <p className={`help is-danger ${isTwitterValid ? 'is-hidden' : ''}`}>
                                    It doesn't match the repeated password.
                                </p>
                            </div>

                            <div className="field">
                                <label className="label">Category name</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input
                                        className="input" placeholder="Ex. Friends" name="categoryName"
                                        value={state.categoryName} onChange={handleChange}/>
                                    <span className="icon is-small is-left">
                                            <i className="fas fa-flag"></i>
                                        </span>
                                </div>
                            </div>

                            <div className="field is-grouped">
                                <div className="control">
                                    <a className={`button is-success ${isLoading ? 'is-loading' : ''}`}
                                       onClick={handleSubmit}>Submit</a>
                                </div>
                                <div className="control">
                                    <Link className="button is-success is-light" to="/Home">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateNewContact;
import React from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import Contacts from './components/Contacts';
import Category from './components/Category';
import CreateNewContact from './components/CreateNewContact';
import SignUp from './components/SignUp';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {UserContext} from "./context/UserContext";
import useLocalStorage from "./helper/useLocalStorage";
import {ToastContainer} from "react-toastify";

const App = () => {
    const [userContext, setUserContext] = useLocalStorage('user');

    return (
        <UserContext.Provider value={[userContext, setUserContext]}>
            <BrowserRouter>
                <div className="hero is-info is-fullheight">
                    <Switch>
                        <Route path='/' exact component={LoginPage}/>
                        <Route path='/Home' component={Home}/>
                        <Route path='/Contacts' component={Contacts}/>
                        <Route path='/Category' component={Category}/>
                        <Route path='/CreateNewContact' component={CreateNewContact}/>
                        <Route path='/SignUp' component={SignUp}/>
                    </Switch>
                </div>
            </BrowserRouter>
            <ToastContainer/>
        </UserContext.Provider>
    )
}

export default App;
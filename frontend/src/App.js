import React, {Component} from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import Contacts from './components/Contacts';
import Category from './components/Category';
import CreateNewContact from './components/CreateNewContact';
import SignUp from './components/SignUp';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AppNavBar from "./components/AppNavBar";

class App extends Component {
    state = {
        isAlreadyLogin: true
    };

    async componentDidMount() {
        const response = await fetch('/clients/isAlreadyLogin');
        this.setState({isAlreadyLogin: response});
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <AppNavBar isHiddenNav={!this.isAlreadyLogin}/>
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
        )
    }
}

export default App;
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
import Services from "./service/Services";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAlreadyLogin: false
        };
    }

    componentDidMount() {
        let services = new Services();
        services.isAlreadyLogin().then(response => response.json()).then(response => {
            let resultCode = response.resultCode;
            let isLoggedin = resultCode > 0;
            this.setState({isAlreadyLogin: isLoggedin});
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <AppNavBar userAlreadyLogin={this.state.isAlreadyLogin}/>
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
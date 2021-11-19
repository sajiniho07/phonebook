import React, {Component} from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import Contacts from './components/Contacts';
import Category from './components/Category';
import CreateNewContact from './components/CreateNewContact';
import SignUp from './components/SignUp';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
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
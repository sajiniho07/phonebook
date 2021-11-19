import React, {Component} from "react";
import AppNavBar from "./AppNavBar";
import axios from "axios";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAlreadyLogin: false
        };
    }

    componentDidMount() {
        axios.get('/isAlreadyLogin')
            .then(response => {
                let resultCode = response.data.resultCode;
                if (resultCode > 0) {
                    this.setState({isAlreadyLogin: true});
                } else {
                    this.setState({isAlreadyLogin: false});
                }
            })
            .catch(error => {
                this.setState({isAlreadyLogin: false});
                console.log(error);
            });
    }

    render() {
        return (
            <>
                <AppNavBar userAlreadyLogin={this.state.isAlreadyLogin}/>
                <div>
                    <h2>Home</h2>
                </div>
            </>
        );
    }
}

export default Home;
import React, {useEffect} from "react";
import AppNavBar from "./AppNavBar";
import ContactCard from "./ContactCard";
import axios from "axios";
import qs from "qs";
import {toast} from "react-toastify";

function Contacts(props) {

    const [contacts, setContacts] = React.useState([]);
    const [state, setState] = React.useState({
        searchContent: "",
        orderBy: 1,
        filterTypeId: 1,
        categoryName: "",
    });
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        getContacts();
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

    function getContacts() {
        setIsLoading(true);
        axios.post('/getContacts',
            qs.stringify(
                {
                    searchContent: state.searchContent,
                    orderBy: state.orderBy,
                    filterTypeId: state.filterTypeId,
                    categoryName: state.categoryName
                }))
            .then(response => {
                setIsLoading(false);
                let resultData = response.data;
                setContacts(resultData);
            })
            .catch(error => {
                toast.error("A bad request was received.");
                setIsLoading(false);
                console.log(error);
            });
    }

    function searchOnEnter(e) {
        if (e.key === "Enter") {
            getContacts();
        }
    }

    function onChangeSelector(e) {
        handleChange(e);
        getContacts();
    }

    return (<>
            <AppNavBar/>
            <div className="hero-body padding-small-mobile">
                <div className={"box"}>
                    <div className="is-flex-row-space flex-wrap">
                        <div className="field has-addons mb-4">
                            <div className="control">
                                <input className="input" type="text" placeholder="Contact name or number"
                                       name="searchContent" value={state.searchContent} onChange={handleChange}
                                       onKeyPress={searchOnEnter}/>
                            </div>
                            <div className="control">
                                <a className={`button is-info fas fa-search ${isLoading ? 'is-loading' : ''}`}
                                   onClick={getContacts}></a>
                            </div>
                        </div>
                        <div className="control has-icons-left mb-4">
                            <div className="select">
                                <select value={state.orderBy} name="orderBy" onChange={onChangeSelector}>
                                    <option value={1} defaultValue="">Descending</option>
                                    <option value={-1}>Ascending</option>
                                </select>
                            </div>
                            <div className="icon is-small is-left">
                                <i className="fas fa-sort-alpha-down"></i>
                            </div>
                        </div>
                        <div className="control has-icons-left mb-4">
                            <div className="select">
                                <select value={state.filterTypeId} name="filterTypeId" onChange={onChangeSelector}>
                                    <option value={1} defaultValue="">All contacts</option>
                                    <option value={2}>Newly added</option>
                                    <option value={3}>Marked</option>
                                    <option value={4}>Has Phonebook account</option>
                                </select>
                            </div>
                            <div className="icon is-small is-left">
                                <i className="fas fa-star"></i>
                            </div>
                        </div>
                        <div className="control has-icons-left mb-4">
                            <div className="select">
                                <select value={state.categoryName} name="categoryName" onChange={onChangeSelector}>
                                    <option value={"all"} defaultValue="">All categories</option>
                                    <option value={"Work"}>Work</option>
                                    <option value={"Friends"}>Friends</option>
                                    <option value={"School"}>School</option>
                                </select>
                            </div>
                            <div className="icon is-small is-left">
                                <i className="fas fa-flag"></i>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="is-flex-tablet flex-wrap">
                        {contacts.map(conInfo => (
                            <ContactCard key={conInfo.id} contactInfo={conInfo}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contacts;
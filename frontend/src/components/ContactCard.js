import React from "react";

function ContactCard(props) {

    const contactInfo = props.contactInfo;
    return (<>
            <div className="card contact-card-panel">
                <div className="card-content position-relative">
                    <span className={`mark-contact-button fas fa-bookmark is-size-3 ${contactInfo.marked ? 'has-text-info' : ''}`}></span>
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img src="https://bulma.io/images/placeholders/96x96.png"/>
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4 has-text-black text-ellipsis">{contactInfo.name}</p>
                            <p className="subtitle is-6 has-text-black is-flex-row-space">
                                <span>{contactInfo.phoneNumber}</span>
                                <a className="fas fa-address-book"></a>
                            </p>
                        </div>
                    </div>
                    <div className="content">
                        <div className="is-flex-row-center">
                            <span className="fas fa-envelope mr-2"></span>
                            {
                                (contactInfo.email) ?
                                    <span>{contactInfo.email}</span>
                                :
                                    <span className="tag is-warning">Nothing recorded.</span>
                            }
                        </div>
                        <div className="is-flex-row-center">
                            <span className="fab fa-facebook mr-2"></span>
                            {
                                (contactInfo.facebook) ?
                                    <span>{contactInfo.facebook}</span>
                                    :
                                    <span className="tag is-warning">Nothing recorded.</span>
                            }
                        </div>
                        <div className="is-flex-row-center">
                            <span className="fab fa-twitter mr-2"></span>
                            {
                                (contactInfo.twitter) ?
                                    <span>{contactInfo.twitter}</span>
                                    :
                                    <span className="tag is-warning">Nothing recorded.</span>
                            }
                        </div>
                        <div className="is-flex-row-center">
                            <span className="fas fa-flag mr-2"></span>
                            {
                                (contactInfo.categoryName) ?
                                    <span>{contactInfo.categoryName}</span>
                                    :
                                    <span className="tag is-warning">Nothing recorded.</span>
                            }
                        </div>
                    </div>
                </div>
                <footer className="card-footer buttons">
                    <a className="card-footer-item button is-dark">Edit</a>
                    <a className="card-footer-item button is-dark is-outlined">Delete</a>
                </footer>
            </div>
        </>
    );
}

export default ContactCard;
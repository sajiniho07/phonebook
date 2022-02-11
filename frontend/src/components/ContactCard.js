import React from "react";

function ContactCard(props) {

    return (<>
            <div className="card contact-card-panel">
                <div className="card-content position-relative">
                    <span className="mark-contact-button fas fa-bookmark is-size-3"></span>
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img src="https://bulma.io/images/placeholders/96x96.png"/>
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4 has-text-black">John Smith</p>
                            <p className="subtitle is-6 has-text-black is-flex-row-space">
                                <span>09027992050</span>
                                <a className="fas fa-address-book"></a>
                            </p>
                        </div>
                    </div>
                    <div className="content">
                        <div className="is-flex-row-center">
                            <span className="fas fa-envelope mr-2"></span>
                            <span>ooo@gmail.com</span>
                        </div>
                        <div className="is-flex-row-center">
                            <span className="fab fa-facebook mr-2"></span>
                            <span>ooo@facebook.com</span>
                        </div>
                        <div className="is-flex-row-center">
                            <span className="fab fa-twitter mr-2"></span>
                            <span className="tag is-warning">Nothing recorded.</span>
                        </div>
                        <div className="is-flex-row-center">
                            <span className="fas fa-flag mr-2"></span>
                            <span className="tag is-info">category</span>
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
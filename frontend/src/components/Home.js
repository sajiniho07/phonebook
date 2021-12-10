import React, {useEffect, useState} from "react";
import AppNavBar from "./AppNavBar";
import {useLocation} from "react-router-dom";

function Home(props) {

    const [userOwnerData, setUserOwnerData] = useState("");
    const location = useLocation();
    useEffect(() => {
        let detail = location.state.detail;
        setUserOwnerData(detail);
    }, [location]);
    return (
        <>
            <AppNavBar userOwnerInfo={userOwnerData}/>
            <div>
                <h2>Home</h2>
            </div>
        </>
    );
}

export default Home;
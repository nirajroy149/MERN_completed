import React, { useEffect, useState } from "react";
import "./CSS/home.css"

function Home(){

    const [userName, setUserName] = useState("");

    const callHomePage = async () => {
        try {
            const res = await fetch("/getData", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            if(data){
                setUserName(data.name);
            }

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        callHomePage();
        // No need to skip the ESLint warning
    }, []);


    return (
        <div id="home">
        <div className="home-container"></div>
            <p>WELCOME</p>
            <h1>{userName}</h1>
            {userName===""? <h1>We Are The MERN Developer</h1>:<p>Happy, to see you back.</p>}
        </div>
    )
}

export default Home;
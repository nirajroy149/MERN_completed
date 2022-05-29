import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img2 from "../images/login3.png"
import "./CSS/login.css";

function Login() {

    const navigate = useNavigate();
    const [user, setUser] = useState({ email: "", password: "" });

    function handleChange(event) {
        const { name, value } = event.target;
        setUser((preValue) => {
            return { ...preValue, [name]: value };
        });
    }

    const CheckData = async (event) => {
        event.preventDefault();

        const { email, password } = user;

        const res = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = await res.json();
        if (res.status === 422 || !data) {
            window.alert("Invalid Credentials");
        } else {
            window.alert("Logged In Successfully");
            navigate("/About");
        }
    }

    return (
        <>
            <section id="login">
                <div className="login-container">
                    <div className="right">
                        <img alt="not found" src={img2}></img>
                    </div>
                    <div className="left">
                        <form method="POST">
                            <h2 className="heading">Sign in</h2>
                            <div className="input-item">
                                <i className="fas fa-envelope"></i><input onChange={handleChange} value={user.email} type="text" name="email" id="name" autoComplete="off" placeholder="Your Email"></input>
                            </div>
                            <div className="input-item">
                                <i className="fas fa-lock"></i><input onChange={handleChange} value={user.password} type="password" name="password" id="password" autoComplete="off" placeholder="Password"></input>
                            </div>
                            <button type="submit" onClick={CheckData} className="btn btn-dark">Login</button>
                        </form>
                        <Link to="/signup">Create an Account</Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;
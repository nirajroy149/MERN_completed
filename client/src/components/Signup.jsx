import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import img2 from "../images/signupimg.png"
import "./CSS/signup.css";

function Signup() {
    const navigate = useNavigate();
    const [user, setUser] = useState({name: "",email: "", phone: "", work: "",password: "", cpassword: ""});

    function handleChange(event) {
        const { name, value } = event.target;

        setUser((preValue) => {
            return { ...preValue, [name]: value };
        });
    }

    const PostDate = async (event) =>{
        event.preventDefault();

        const { name, email, phone, work, password, cpassword } = user;

        const res = await fetch("/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",  
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword 
            })
        });
        const data = await res.json();
        if(res.status === 422 || !data){
            window.alert("Invalid Registration");
        }else{
            window.alert("Registration Successful");
            navigate("/login");
        }
    }

    return (
        <>
            <section id="signup">
                <div className="signup-container">
                    <div className="left">
                        <form method="POST">
                            <h2 className="heading">Sign up</h2>
                            <div className="input-item">
                                <i className="fas fa-user"></i><input value={user.name} onChange={handleChange} type="text" name="name" id="name" autoComplete="off" placeholder="Your Name"></input>
                            </div>
                            <div className="input-item">
                                <i className="fas fa-envelope"></i><input value={user.email} onChange={handleChange} type="text" name="email" id="email" autoComplete="off" placeholder="Your Email"></input>
                            </div>
                            <div className="input-item">
                                <i className="fas fa-phone-alt"></i><input value={user.phone} onChange={handleChange} type="number" name="phone" id="phone" autoComplete="off" placeholder="Your Phone"></input>
                            </div>
                            <div className="input-item">
                                <i className="fas fa-user-tie"></i><input value={user.work} onChange={handleChange} type="text" name="work" id="profession" autoComplete="off" placeholder="Your Profession"></input>
                            </div>
                            <div className="input-item">
                                <i className="fas fa-lock"></i><input value={user.password} onChange={handleChange} type="password" name="password" id="password" autoComplete="off" placeholder="Password"></input>
                            </div>
                            <div className="input-item">
                                <i className="fas fa-lock"></i><input value={user.cpassword} onChange={handleChange} type="password" name="cpassword" id="cpassword" autoComplete="off" placeholder="Confirm password"></input>
                            </div>
                            <button type="submit" onClick={PostDate} className="btn btn-dark">Signup</button>
                        </form>
                        <Link to="/login">Already have account?</Link>
                    </div>
                    <div className="right">
                        <img alt="not found" src={img2}></img>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup;
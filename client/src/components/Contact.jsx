import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/contact.css";

function Contact() {

    const navigate = useNavigate();
    const [userData, setuserData] = useState({ name: "", email: "", phone: "", message: "" });

    const callAboutPage = async () => {
        try {
            const res = await fetch("/getData", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            
            setuserData({ name: data.name, email: data.email, phone: data.phone, message: "" })

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            navigate("/login")
            console.log(err);
            
        }
    }

    useEffect(() => {
        callAboutPage();
        // No need to skip the ESLint warning
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setuserData((preValue) => {
            return { ...preValue, [name]: value }
        });

    }

    const Contactform = async (e) => {
        e.preventDefault();
        const { name, email, phone, message } = userData;

        const res = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        })

        const data = await res.json();
        
        if (res.status===422) {
            alert("message not sent");
        } else {
            alert("Message Sent!");
            setuserData({ ...userData, message: "" });
        }
    }

    return (
        <>
            <section id="contact">
                <div className="contact-info">
                    <div className="info">
                        <i className="fas fa-at"></i>
                        <div>
                            <h5>Email</h5>
                            <p>nirajroy186@gmail.com</p>
                        </div>
                    </div>
                    <div className="info">
                        <i className="fas fa-mobile"></i>
                        <div>
                            <h5>Phone</h5>
                            <p>6299218393</p>
                        </div>
                    </div>
                    <div className="info">
                        <i className="fas fa-address-book"></i>
                        <div>
                            <h5>Address</h5>
                            <p>Kolkata, West Bengal</p>
                        </div>
                    </div>
                </div>
                <form method="POST" className="contact-form">
                    <h3 className="heading">Get in Touch</h3>
                    <div>
                        <input value={userData.name} onChange={handleChange} placeholder="Your Name" autoComplete="off" id="name" name="name"></input>
                        <input value={userData.email} onChange={handleChange} placeholder="Your Email" autoComplete="off" id="email" name="email"></input>
                        <input value={userData.phone} onChange={handleChange} placeholder="Your Phone Number" autoComplete="off" id="phone" name="phone"></input>
                    </div>
                    <textarea value={userData.message} onChange={handleChange} name="message" rows="5" placeholder="Message"></textarea>
                    <button onClick={Contactform} type="submit" className="btn btn-dark">Send Message</button>
                </form>
            </section>
        </>
    )
}

export default Contact;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dp from "../images/nirajdp1.jpg";
import unknowndp from "../images/unknowndp.png"
import "./CSS/about.css";


function About() {

    const navigate = useNavigate();
    const [userData, setuserData] = useState({});

    const callAboutPage = async () => {
        try {
            const res = await fetch("/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            // console.log(data);
            setuserData(data)

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;

            }

        } catch (err) {
            console.log(err);
            navigate("/login");
        }
    }

    useEffect(() => {
        callAboutPage();
        // No need to skip the ESLint warning
    },[]);

    return (
        <>
            <section id="about">
                <form method="GET">
                    <div className="about-container">
                        <div className="row center">
                            <div className="col-md-4">
                                <img src={userData.name === "Niraj Kumar Roy" ? dp : unknowndp} alt="not found"></img>

                            </div>
                            <div className="col-md-6 info">
                                <h3>{userData.name}</h3>
                                <p className="color-blue">{userData.work}</p>
                                <p className="ranking">RANKING: <span>1/10</span></p>

                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-light">Edit profile</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 mt-3 color-grey center">
                                <p>Coder</p>
                                <p>Gamer</p>
                                <p>Creater</p>
                                <p>UI/UX</p>
                                <p>Web Developer</p>
                                <p>Engineering Student</p>
                            </div>
                            <div className="col-md-6 bottom-content">
                                <ul className="nav nav-tabs mb-2" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="about-tab" data-bs-toggle="tab" data-bs-target="#about-info" type="button" role="tab" aria-controls="about" aria-selected="true">About</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="timeline-tab" data-bs-toggle="tab" data-bs-target="#timeline" type="button" role="tab" aria-controls="timeline" aria-selected="false">Timeline</button>
                                    </li>

                                </ul>

                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="about-info" role="tabpanel" aria-labelledby="about-tab">
                                        <div className="tab-flex">
                                            <div><span>User Id</span><span>201090284</span></div>
                                            <div><span>Name</span><span>{userData.name}</span></div>
                                            <div><span>Email</span><span>{userData.email}</span></div>
                                            <div><span>Phone</span><span>{userData.phone}</span></div>
                                            <div><span>Student</span><span>CSE</span></div>
                                        </div>

                                    </div>
                                    <div className="tab-pane fade" id="timeline" role="tabpanel" aria-labelledby="timeline-tab">

                                        <div className="tab-flex">
                                            <div><span>Experience</span><span>Intermediate</span></div>
                                            <div><span>Hourly Rate</span><span>10$/hr</span></div>
                                            <div><span>Total Projects</span><span>10</span></div>
                                            <div><span>English Level</span><span>Expert</span></div>
                                            <div><span>Availability</span><span>2 months</span></div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}

export default About;
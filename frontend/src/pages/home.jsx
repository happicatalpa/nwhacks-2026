import React from "react";
import { Link } from "react-router-dom";

export default function Home() {

    return (
        <div id="home">
            <div id="start">
                <h1 id="name">Happy <br /> Yapper</h1>
                <div id="home-button">
                    <Link to="/setup">
                        <button className="btn btn-large">START</button>
                    </Link>
                </div>
            </div>
            <img src="/yaptrainerhome.png" id="yaptrainerhome"></img>
            <img src="/background.png" id="background"></img>
        </div>
    );
}
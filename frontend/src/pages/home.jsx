import React from "react";
import { Link } from "react-router-dom";

export default function Home() {

    return (
        <div id="home">
            <h1 id="name">Happy <br /> Yapper</h1>
            <div id="home-buttons">
                <Link to="/setup">
                    <button id="large">START</button>
                </Link>
            </div>
            <img src="/background.png" id="background"></img>
        </div>
    );
}
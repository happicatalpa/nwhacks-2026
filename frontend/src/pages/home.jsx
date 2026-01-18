import React from "react";
import { Link } from "react-router-dom";

export default function Home() {

  return (
    <div id="home"> 
        <h1>Happy Yapper</h1>
        <Link to="/setup">
            <button id="large">START</button>
        </Link>
        <button id="large">Help</button>
    </div>
  );
}
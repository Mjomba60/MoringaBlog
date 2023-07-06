import React from "react";
import Moonimage from "../../assets/home.png";

function HomeData() {
  return (
    <div className="container">
      <div className="welcome-text">
        <p>WELCOME TO MORINGA</p>
      </div>
      <div className="home-first">
        <div className="home-first-content">
          <div className="home-first-image">
            <img src={Moonimage} alt="moon-Image" />
            <div className="text-overlay">
              <div className="overlay-text">
                <p>
                  <b>INSPIRE</b> 
                </p>
                <p>AND GET</p>
                <p>INSPIRED</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeData;

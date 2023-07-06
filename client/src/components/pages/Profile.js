import React from "react"
import Teddybear from "../../assets/TeddyBear.png"
import ProfileForm from "../forms/ProfileForm"
import AnalyticsForm from "../forms/AnalyticsForm"
// import { Button } from "semantic-ui-react"

function Profile() {
  return (
    <div className="profile">
      <div className="profile-header">Profile</div>
      <div className="major-div">
        <div className="left-div">
          <div className="teddybear-img">
            <img
              src={Teddybear}
              alt="Teddybear-image"
              height={400}
              width={400}
            />
          </div>
          <div className="user-form">
            <ProfileForm />
          </div>
        </div>
        <hr></hr>
        <div className="right-div">
          <h3>Favorite Categories</h3>
          <div className="Userfavorite-categories">
            <div className="favoritecategories-list">
              <ol>
                <li>Sports</li>
                <li>Food</li>
                <li>Technology</li>
                <li>Science</li>
              </ol>
            </div>
          </div>
          <h3>Analytics</h3>
          <div className="User-Analytics">
            <div className="Analytics-list">
              <AnalyticsForm />
            </div>
          </div>
          <div className="Donate-button">
            <button>Donate</button>
          </div>
          <div className="Deleteaccount-button">
            <button>DELETE ACCOUNT</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

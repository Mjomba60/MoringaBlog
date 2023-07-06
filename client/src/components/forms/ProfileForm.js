import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

function ProfileForm() {
  const location = useLocation()

  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const user = location.state?.user
    user ? setCurrentUser(user) : setCurrentUser(null)
    console.log("no 3")
    // setComments(data.comments)
  }, [location.state?.user])

  return (
    <div className="Profile-form">
      <form>
        <div>
          <label for="profile-firstname">First Name : </label>
          <input
            name="username"
            id="profile-firstname"
            value={
              currentUser?.first_name
                ? `${currentUser.first_name}`
                : "first name"
            }
            disabled
          ></input>
        </div>
        <div>
          <label for="profile-lastname">Last Name : </label>
          <input
            name="username"
            id="profile-lastname"
            value={
              currentUser?.last_name ? `${currentUser.last_name}` : "last name"
            }
            disabled
          ></input>
        </div>
        <div>
          <label for="profile-username">User Name : </label>
          <input
            name="username"
            id="profile-username"
            value={
              currentUser?.user_name ? `${currentUser.user_name}` : "username"
            }
            disabled
          ></input>
        </div>
        <div>
          <label for="profile-email">Email : </label>
          <input
            name="username"
            id="profile-email"
            value={currentUser?.email ? `${currentUser.email}` : "email"}
            disabled
          ></input>
        </div>
      </form>
    </div>
  )
}

export default ProfileForm

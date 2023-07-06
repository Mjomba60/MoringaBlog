

import React, { useState, useEffect } from "react";

function AboutUs() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:9292/users");
      const data = await response.json();
      const firstFiveUsers = data.slice(0, 5).map((user) => ({
        ...user,
        description: generateDescription(),
      }));
      setUsers(firstFiveUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  const generateDescription = () => {
    const descriptions = [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "UI/UX Designer",
      "Software Engineer",

    ];
    const randomIndex = Math.floor(Math.random() * descriptions.length);
    return descriptions[randomIndex];
  };


  return (
    <div>
      <h1>About Us</h1>

      <p>We are comitted to make sure that this applications is as helpful as intended. <br>
      </br>Through a team of developers that are committed and dedicated their efforts to this web application,
      <br></br>they have made sure that you as a user are going to enjoy and feel comfortable as you navigate<br></br>
      through the application. Thank you!<br></br>
      Meet our team;</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>Name:</strong> {user.first_name} {user.last_name},  <strong>Email:</strong>{" "}
            {user.email}, <strong>Description:</strong>{" "}
            {user.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AboutUs;

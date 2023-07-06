import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Articles from "./components/pages/Articles";
import Navbar from "./components/Navigation/Navbar";
import AboutUs from "./components/pages/AboutUs";
import ContactUS from "./components/pages/ContactUs";
import CreateArticle from "./components/pages/CreateArticle";
import Profile from "./components/pages/Profile";
import Footer from "./components/Navigation/Footer";
import SingleArticle from "./components/pages/SingleArticle";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import EditArticle from "./components/pages/EditArticle";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className="app-navigation">
        <Router>
          <Navbar />
        </Router>
      </div>
      <div className="app-main">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/articles/create" element={<CreateArticle />} />
            <Route path="/articles/edit/:id" element={<EditArticle />} />
            <Route path="/articles/:id" element={<SingleArticle />} />
            <Route path="/contactus" element={<ContactUS />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </div>
      <div className="app-footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;

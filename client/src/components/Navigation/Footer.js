import React from "react"
import { FaInstagram } from "react-icons/fa"
import Icon from "../../assets/Icon.png"
import { SlSocialTwitter } from "react-icons/sl"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Moringa Blog
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

function Footer() {
  return (
    <div className="app-footer-group">
      <div className="footer-socials">
        <img src={Icon} alt="logo.png" height={20} width={20} />
        <p>Making the world a better place</p>
        <SlSocialTwitter />
        <FaInstagram />
      </div>
      <div className="footer-pages">
        <p>
          <b>MORINGA BLOG</b>
        </p>
        <button>
          <p>
            <b>ABOUT US</b>
          </p>
        </button>
        <button>
          <p>
            <b>ARTICLES</b>
          </p>
        </button>
      </div>
      <div className="footer-resources">
        <p>
          <b>RESOURCES</b>
        </p>
        <button>
          <p>Terms and Conditions</p>
        </button>
        <button>
          <p>Privacy Policy</p>
        </button>
      </div>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </div>
  )
}

export default Footer

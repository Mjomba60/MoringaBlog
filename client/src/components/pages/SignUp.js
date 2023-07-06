import React, { useState, useEffect } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { RegisterUser } from "../../api/api"
import { useNavigate } from "react-router-dom"

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme()

export default function SignUp() {
  //   {
  //     "first_name": "test34",
  //     "last_name": "test35",
  //     "user_name": "test34",
  //     "password": "passwordtest35",
  //     "email": "test35@example.com"
  // }
  const [form, setForm] = useState({})
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate()

  const onchange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(form)
    // LoginUser = (userData, setData, setError)
    RegisterUser(form, setData, setError)
  }

  useEffect(() => {
    if (data?.status === 201) {
      console.log("here")
      console.log(data)
      setForm({})
      setSuccess({
        responsestatusText: "Signup is successful",
        detail: `Account is ${data.statusText}`,
      })
      setTimeout(() => {
        setData({})
        navigate("/signin")
      }, 2000)
    } else {
      console.log(error)
    }
  }, [data, navigate, error])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            CREATE AN ACCOUNT
          </Typography>
          {success ? (
            <Typography component="h1" variant="h5">
              {success.responsestatusText} <br /> {success.detail}
            </Typography>
          ) : (
            ""
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="first_name"
              label="First Name"
              name="first_name"
              autoFocus
              onChange={onchange}
              value={form.first_name || ""}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="last_name"
              label="Last Name"
              name="last_name"
              autoFocus
              onChange={onchange}
              value={form.last_name || ""}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="user_name"
              label="User Name"
              name="user_name"
              autoFocus
              onChange={onchange}
              value={form.user_name || ""}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onchange}
              value={form.email || ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onchange}
              value={form.password || ""}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"Have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

import React, { useState, useEffect } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"

import DocumentScannerIcon from "@mui/icons-material/DocumentScanner"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { useLocation, useNavigate } from "react-router-dom"
import { EditArticleSingle } from "../../api/api"
import axios from "axios"

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme()

export default function EditArticle() {
  const [form, setForm] = useState({})
  const [currentUser, setCurrentUser] = useState(null)
  const [hasUser, setHasUser] = useState(false)
  const [resp, setResponse] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const user = location.state?.user
    console.log(user)
    user ? setCurrentUser(user) : setCurrentUser(null)
    user ? setHasUser(true) : setHasUser(false)
  }, [location.state?.user])

  useEffect(() => {
    const data_ = location.state?.data_to_edit
    console.log(data_)
    data_ ? setForm(data_) : setForm({})
  }, [location.state?.data_to_edit])

  useEffect(() => {
    if (resp?.status === 200) {
      console.log(resp.data.id)
      navigate(`/articles/${resp.data.id}`, {
        state: { article_data: resp.data, ...location.state },
      })
    }
    // console.log("in useffect")
    // console.log(resp)
  }, [location.state, resp])

  const handleSubmit = (event) => {
    event.preventDefault()

    const author_name_long = `${currentUser?.first_name}_${currentUser?.last_name}`

    let data_to_send = {
      author_name: author_name_long,
      date: new Date().toString(),
      ...form,
    }

    console.log(data_to_send)
    delete data_to_send.comments
    delete data_to_send.id
    delete data_to_send.author_name
    EditArticleSingle(form.id, data_to_send, setResponse)
  }

  const onchange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const RandomImage = (topic) => {
    return axios
      .get("https://api.unsplash.com/photos/random", {
        params: {
          query: topic,
          client_id: "EgbFMj3LQq1X_9c4tI7Qj6XRsXgNEwAmQnPfNugasRg",
        },
      })
      .then((response) => {
        console.log(response.data.urls.regular)
        return setForm({
          ...form,
          image_url: response.data.urls.regular,
          category: topic,
        })
      })
  }
  const onchangeselect = (e) => {
    e.preventDefault()
    const categry = e.target.value
    RandomImage(categry)
  }
  const categories = ["food", "sports", "education", "science", "Technology"]
  // const handleChange = (event: SelectChangeEvent) => {
  //   setForm({ ...form, [event.target.name]: event.target.value })
  // }

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
            <DocumentScannerIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            EDIT YOUR ARTICLE
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title of The Article"
            name="title"
            autoComplete="title"
            autoFocus
            value={form.title || ""}
            onChange={onchange}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="category"
              value={form.category || ""}
              label="Category"
              onChange={onchangeselect}
            >
              {/* <MenuItem value="tech">Tech</MenuItem>
              <MenuItem value="food">Food</MenuItem> */}

              {categories.map((cat, index) => (
                <MenuItem key={index} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <textarea
              name="body"
              className="article-body"
              onChange={onchange}
              value={form.body || ""}
              rows="9"
              cols="70"
            ></textarea>
          </FormControl>

          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            PUBLISH UPDATE
          </Button>
        </Box>
        {/* </Box> */}
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  )
}

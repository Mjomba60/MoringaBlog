import React, { useState, useEffect } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import { useTheme } from "@mui/material/styles"
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { EditArticleSingle, GetArticleSingle } from "../../api/api"
import axios from "axios"

import OutlinedInput from "@mui/material/OutlinedInput"
import Chip from "@mui/material/Chip"

// TODO remove, this demo shouldn't need to reset the theme.
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const categories = [
  "food",
  "sports",
  "education",
  "science",
  "Technology",
  "Programming",
  "travel",
]

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

const defaultTheme = createTheme()

export default function EditArticle() {
  const theme = useTheme()
  const [form, setForm] = useState({})
  const [topicCategory, setTopicCategory] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [hasUser, setHasUser] = useState(false)
  const [resp, setResponse] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()
  const paramsRoute = useParams()

  useEffect(() => {
    const user = location.state?.user
    console.log(user)
    user ? setCurrentUser(user) : setCurrentUser(null)
    user ? setHasUser(true) : setHasUser(false)
  }, [location.state?.user])

  // useEffect(() => {
  //   const data_ = location.state?.data_to_edit
  //   console.log(data_)
  //   data_ ? setForm(data_) : setForm({})
  // }, [location.state?.data_to_edit])

  useEffect(() => {
    // setArticleData(data)
    let { id } = paramsRoute
    console.log(parseInt(id))
    GetArticleSingle(parseInt(id), setForm)
  }, [paramsRoute])

  useEffect(() => {
    if (resp?.status === 200) {
      console.log(resp.data.id)
      navigate(`/articles/${parseInt(paramsRoute.id)}`, {
        state: { article_data: resp.data, ...location.state },
      })
    }
    // console.log("in useffect")
    // console.log(resp)
  }, [resp])

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
    // const categry = e.target.value
    const {
      target: { value },
    } = e
    setTopicCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
    RandomImage(topicCategory)
  }

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
            CREATE YOUR ARTICLE
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
            <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              value={topicCategory}
              label="Category"
              onChange={onchangeselect}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {categories.map((cat) => (
                <MenuItem
                  key={cat}
                  value={cat}
                  style={getStyles(cat, topicCategory, theme)}
                >
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

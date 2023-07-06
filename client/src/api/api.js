// import { Article } from "@mui/icons-material"
import axiosFetch from "../Axios"

export const RegisterUser = (userData, setData, setError) => {
  axiosFetch()
    .post("/users", userData)
    .then((response) => {
      console.log(response)
      setData(response)
    })
    .catch((error) => {
      console.log(error)
      setError(error)
    })
}

export const LoginUser = (userData, setData, setError) => {
  axiosFetch()
    // .post("/users/authenticate", userData)
    .post("/login", userData)
    .then((response) => {
      console.log(response)
      setData(response)
      // console.log(response.status)
    })
    .catch((error) => {
      console.log(error)
      setError(error)
    })
}

export const CreateArticlePost = (ArticleData, setResponse) => {
  axiosFetch()
    .post("/articles", ArticleData)
    .then((response) => {
      console.log(response)
      setResponse(response)
    })
    .catch((error) => {
      console.log(error)
    })
}

export const GetArticleMany = (setData) => {
  // setLoading(true)
  axiosFetch()
    .get("/articles")
    .then((response) => {
      // console.log(response.data)
      setData(response.data)
    })
    .catch((error) => {
      console.log(error)
      // set(false)
    })
}

// /articles/:id

export const GetArticleSingle = (id, setData) => {
  // setLoading(true)
  axiosFetch()
    .get(`/articles/${id}`)
    .then((response) => {
      console.log(response)
      setData(response.data)
    })
    .catch((error) => {
      console.log(error)
      // set(false)
    })
}

export const EditArticleSingle = (id, newData, setData) => {
  // setLoading(true)
  axiosFetch()
    .put(`/articles/${id}`, newData)
    .then((response) => {
      console.log(response)
      setData(response)
    })
    .catch((error) => {
      console.log(error)
      // set(false)
    })
}
export const CreateComment = (
  CommentData,
  article_id,
  setLoading,
  setCreateData
) => {
  setLoading(true)
  axiosFetch()
    .post(`/articles/${article_id}/comments`, CommentData)
    .then((response) => {
      console.log(response.data)
      setCreateData(response)
      setLoading(false)
    })
    .catch((error) => {
      console.log(error)
      setLoading(false)
    })
}
// /articles/:article_id/comments/:comment_id

export const DeleteComment = (article_id, comment_id, setLoading) => {
  setLoading(true)
  axiosFetch()
    .delete(`/articles/${article_id}/comments/${comment_id}`)
    .then((response) => {
      console.log(response.data)
      // setCreateData(response)
      setLoading(false)
    })
    .catch((error) => {
      console.log(error)
      setLoading(false)
    })
}

export const SendInteraction = (article_id, InteractionData, setData) => {
  axiosFetch()
    .post(`/articles/${article_id}/interaction`, InteractionData)
    .then((response) => {
      console.log(response)
      setData(response)
    })
    .catch((error) => {
      console.log(error)
      setData(error)
    })
}

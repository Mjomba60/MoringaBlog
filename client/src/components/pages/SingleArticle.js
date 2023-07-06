import React, { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { AiFillLike, AiOutlineLike } from "react-icons/ai"
import { CreateComment, GetArticleSingle } from "../../api/api"
import { DeleteComment, SendInteraction } from "../../api/api"
import Chip from "@mui/material/Chip"

function SingleArticle() {
  const location = useLocation()
  const navigate = useNavigate()
  const routeParams = useParams()

  // console.log(routeParams)
  const [ArticleData, setArticleData] = useState(null)
  const [form, setForm] = useState({})
  const [currentUser, setCurrentUser] = useState(null)
  const [createData, setCreateData] = useState(null)
  const [Data, setData] = useState(null)
  // const comments_data = [
  //   { comment: "Nice Post", by: "user1", time: "2 minute ago" },
  //   { comment: "Nice Post", by: "user1", time: "2 minute ago" },
  //   { comment: "Nice Post", by: "user1", time: "2 minute ago" },
  // ]

  const [comments, setComments] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(null)
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    // setArticleData(data)
    let { id } = routeParams
    console.log(parseInt(id))
    GetArticleSingle(parseInt(id), setArticleData)
    console.log("no 1")
  }, [routeParams])

  // useEffect(() => {
  //   if(Data.)
  // })

  useEffect(() => {
    if (ArticleData?.comments) {
      setComments(ArticleData.comments)
      console.log("no 2")
    }
  }, [ArticleData?.comments])
  useEffect(() => {
    const user = location.state?.user
    user ? setCurrentUser(user) : setCurrentUser(null)
    console.log("no 3")
    // setComments(data.comments)
  }, [location.state?.user])

  useEffect(() => {
    if (createData?.status === 200) {
      GetArticleSingle(ArticleData?.id, setArticleData)
      console.log("no 4")
    }
  }, [ArticleData?.id, createData?.status])

  useEffect(() => {
    if (loadingDelete) {
      GetArticleSingle(ArticleData?.id, setArticleData)
      console.log("no 5")
    }
  }, [ArticleData?.id, createData?.status, loadingDelete])

  const onchange = (e) => [
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    }),
  ]
  const handleLike = async () => {
    try {
      const int_data = {
        user_id: currentUser?.id,
        article_id: ArticleData?.id,
        interaction_type: "like",
      }
      const data = await SendInteraction(ArticleData?.id, int_data);
      setData(data);
      setLikes(data.likes);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleDislike = async () => {
  //   try {
  //     const int_data = {
  //       user_id: currentUser?.id,
  //       article_id: ArticleData?.id,
  //       interaction_type: "dislike",
  //     }
  //     const data = await SendInteraction(ArticleData?.id, int_data);
  //     setData(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="singlearticle-majordiv">
      <div className="article-window">
        <h1 style={{ textDecoration: 'underline'}}>{ArticleData ? ArticleData.title : "Single Article"}</h1>
        <h6 style={{ textDecoration: 'underline'}}>
          {ArticleData?.author_name && ArticleData?.date
            ? `By ${ArticleData?.author_name} ${ArticleData?.date}`
            : "Anonymous Author"}
        </h6>
        <div className="article-interaction">
        <ul>
          {likes.map((like) => (
            <li key={like.id}>
              User ID: {like.user_id}, Interaction Type: {like.interaction_type}
            </li>
          ))}
        </ul>
          <button
            // onClick={(e) => {
            //   e.preventDefault()
            //   let int_data = {
            //     user_id: currentUser?.id,
            //     article_id: ArticleData?.id,
            //     interaction_type: "like",
            //   }
            //   // SendInteraction(ArticleData?.id, int_data, setData)
            //   SendInteraction(ArticleData?.id, int_data, (data) => {
            //     setData(data);
            //     // Update the likes count
            //     setLikes(data.likes);
            //   });
            // }}onClick={handleLike}
            onClick={handleLike}
          >
            {" "}
            {<AiFillLike />}
            {likes.length}
          </button>
          {/* <button 
          // onClick={(e) => {
          //   e.preventDefault()
          //   let int_data = {
          //     user_id: currentUser?.id,
          //     article_id: ArticleData?.id,
          //     interaction_type: "dislike",
          //   }
          //   SendInteraction(ArticleData?.id, int_data, setData)
          // }}
          onClick={handleDislike}
          >{<AiOutlineLike />}</button> */}
          <button>{ArticleData?.category}</button>
        </div>

        <img
          src={ArticleData?.image_url}
          alt={ArticleData?.title}
          height={200}
          width={300}
        />
        <p>{ArticleData ? ArticleData?.body : "No Information"}</p>

        <hr />
        <div className="comment-box">
          <Chip
            label=" Edit Article"
            variant="outlined"
            onClick={(e) => {
              e.preventDefault()
              navigate(`/articles/edit/${ArticleData?.id}`, {
                state: { data_to_edit: ArticleData, ...location.state },
              })
            }}
          />
        </div>
      </div>
      <div className="comment-section-general">
        <div className="comment-section">
          <p>{`${comments?.length}`} Comments</p>
          {comments
            ? comments.map((comment, index) => {
                return (
                  <div className="comment-box-comment" key={index}>
                    <div className="comment-box-comment-user">
                      <p>{comment.user.first_name}</p>
                    </div>
                    <div>
                      <p>{comment.comments}</p>
                      <p>{`posted at: ${comment.created_at}`}</p>
                      {currentUser?.id === comment.user.id ? (
                        <Chip
                          label="delete comment"
                          variant="outlined"
                          onDelete={(e) => {
                            e.preventDefault()
                            DeleteComment(
                              ArticleData?.id,
                              comment.id,
                              setLoadingDelete
                            )
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                )
              })
            : ""}
        </div>
        <div className="comment-form-div">
          <form className="comment-form">
            <div>
              {/* <label for="txtarea">Add Your comment: </label> */}
              <br />
              {loading ? "Posting ..." : ""}
              {/* <textarea
                id="txtarea"
                name="comments"
                placeholder="Comment here"
                onChange={onchange}
                value={form.comments || ""}
              ></textarea> */}
              <br />
              {/* <button onClick={handleSubmit}> Post comment</button> */}

              <div className="comment-button">
                <Chip
                  label=" Comment"
                  variant="outlined"
                  onClick={(e) => {
                    e.preventDefault()
                    let comment_data = {
                      article_id: ArticleData?.id,
                      user_id: currentUser?.id,
                      ...form,
                    }
                    console.log(comment_data)
                    CreateComment(
                      comment_data,
                      ArticleData?.id,
                      setLoading,
                      setCreateData
                    )
                  }}
                  // onClick={handleSubmit}
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="comment-section">
        <p style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{`${comments?.length}`} Comments</p>
        {comments
          ? comments.map((comment, index) => {
              return (
                <div className="comment-box-comment" key={index}>
                  <div className="comment-box-comment-user">
                    <p style={{ fontWeight: 'bold' }}>{comment.user.first_name}</p>
                  {/* </div>
                  <div> */}
                    <p>{comment.comments}</p>
                    {/* <p>{`posted at: ${comment.created_at}`}</p> */}
                    {currentUser.id !== comment.user.id ? (
                      ""
                    ) : (
                      <Chip
                        label="delete comment"
                        variant="outlined"
                        onDelete={(e) => {
                          e.preventDefault()
                          DeleteComment(
                            ArticleData?.id,
                            comment.id,
                            setLoadingDelete
                          )
                        }}
                      />
                    )}
                  </div>
                </div>
              )
            })
        : ""}
        <div className="text">
          <textarea
            id="txtarea"
            name="comments"
            placeholder="Comment here"
            onChange={onchange}
            value={form.comments || ""}
          ></textarea>
          <Chip
            label=" Post comment"
            variant="outlined"
            onClick={(e) => {
              e.preventDefault()
              let comment_data = {
                article_id: ArticleData?.id,
                user_id: currentUser?.id,
                ...form,
              }
              console.log(comment_data)
              CreateComment(
                comment_data,
                ArticleData?.id,
                setLoading,
                setCreateData
              )
            }}
            // onClick={handleSubmit}
          /></div>
      </div>

      {/* {console.log(ArticleData)} */}
    </div>
  )
}

export default SingleArticle

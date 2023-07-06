import React from "react"
import { FcShare } from "react-icons/fc"
import { useNavigate, useLocation } from "react-router-dom"

function PostData({ post, index, inlist }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div
      className="post-list-container"
      key={index}
      onClick={(e) => {
        e.preventDefault()
        navigate(`/articles/${index + 1}`, {
          state: { article_data: post, ...location.state },
        })
      }}
    >
      <div className="post-list-image">
        {inlist ? (
          ""
        ) : (
          <img src={post.image_url} alt={post.title} height={150} width={150} />
        )}
      </div>

      <div className="post-list-data">
        <h6>{`Author: ${post.author_name}. ${post.date}`}</h6>
        <h5>{post.title}</h5>
        <p>{post.body}</p>
        <div>
          <button>share{<FcShare />}</button>
          <button>{post.category}</button>
        </div>
      </div>
    </div>
  )
}

export default PostData

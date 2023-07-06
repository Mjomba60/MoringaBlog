import React from "react"
import { useState } from "react"
import FirstImage from "../../assets/pexels-athena-2582937.jpg"
import { Link } from "react-router-dom"
import PostData from "../utils/PostData"

function PostList() {
  const data = [
    {
      body: "xyz",
      imgurl: FirstImage,
      author_name: "author 1",
      date: "07/06/2003 03:09",
      title: "title 1",
      category: "tech",
    },
    {
      body: "xyz",
      imgurl: FirstImage,
      author_name: "author 1",
      date: "07/06/2003 03:09",
      title: "title 1",
      category: "tech",
    },
    {
      body: "xyz",
      imgurl: FirstImage,
      author_name: "author 1",
      date: "07/06/2003 03:09",
      title: "title 1",
      category: "tech",
    },
  ]
  const [PostList, setPostList] = useState(data)
  return (
    <div>
      <div className="post-list">
        {PostList.map((post, index) => {
          return <PostData post={post} index={index} />
        })}
      </div>
      <Link to="/articles">View all</Link>
    </div>
  )
}

export default PostList

import { useState } from "react"
import React from "react"
import FirstImage from "../../assets/pexels-athena-2582937.jpg"
import PostData from "../utils/PostData"
import { Link } from "react-router-dom"

function HomeData3() {
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

  const [PostList, setPostList] = useState(data.slice(0, 2))
  const [PostListAll, setPostListAll] = useState(data)
  return (
    <div>
      <div>
        <div className="articles-recent-title">
          <p>
            <b>Recent posts</b>
          </p>
          <Link to="/articles">View all</Link>
        </div>
        <div className="articles-recents">
          {PostList.length === 0
            ? "Data Loading..."
            : PostList.map((post, index) => {
                return <PostData post={post} index={index} />
              })}
        </div>
      </div>
    </div>
  )
}

export default HomeData3

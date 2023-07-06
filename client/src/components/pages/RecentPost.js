import { useState } from "react"
import React from "react"
import FirstImage from "../../assets/pexels-athena-2582937.jpg"

function RecentPost() {
  const data = {
    body: "xyz",
    imgurl: FirstImage,
    author_name: "author 1",
    date: "07/06/2003 03:09",
    title: "title 1",
    category: "tech",
  }

  const [RecentPost, setRecentPost] = useState(data)
  return (
    <div>
      <h2>RecentPost</h2>
      <div>
        <img src={FirstImage} alt="motherboard" height={400} width={600} />
        <h6>{`Author: ${RecentPost.author_name}. ${RecentPost.date}`}</h6>
        <h5>{RecentPost.title}</h5>
        <p>{RecentPost.body}</p>
        <button>like</button>
        <button>dislike</button>
        <button>share</button>
        <button>{RecentPost.category}</button>
      </div>
    </div>
  )
}

export default RecentPost

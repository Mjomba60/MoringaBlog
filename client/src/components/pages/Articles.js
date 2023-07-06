import { useEffect, useState } from "react"
import React from "react"
import PostData from "../utils/PostData"
import { Link, useLocation } from "react-router-dom"
import { GetArticleMany } from "../../api/api.js"
import SearchComponent from "./Search"

function Articles() {
  const [PostListAll, setPostListAll] = useState([])
  const [PostList, setPostList] = useState([])
  const startIndex = 3
  const location = useLocation()
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    GetArticleMany(setPostListAll)
    console.log("here")
    console.log(PostListAll)
    setPostList(PostListAll.slice(0, 2))
    // setPostListAll(PostListAll.slice())
  }, [PostListAll?.length])

  const handleSearch = (searchCriteria) => {
    const filteredResults = PostListAll.filter((post) => {
      const regex = new RegExp(searchCriteria, "i")
      return regex.test(post.title) || regex.test(post.content)
    })

    setSearchResults(filteredResults)
  }

  useEffect(() => {
    GetArticleMany(setPostListAll)
    console.log("here")
    console.log(PostListAll)
    setPostList(PostListAll.slice(0, 2))
  }, [PostListAll?.length])

  return (
    <div>
      <div className="articles-recent-title">
        <p>
          <b>Recent posts</b>
        </p>
        {/* <Link to="/articles" state={location.state}>
            View all
          </Link> */}
      </div>
      <div>
        <SearchComponent onSearch={handleSearch} />
      </div>
      <div className="articles-recents">
        {searchResults.length > 0
          ? searchResults.map((post, index) => (
              <PostData post={post} index={index} key={index} />
            ))
          : PostList.map((post, index) => (
              <PostData post={post} index={index} key={index} />
            ))}
      </div>
      <div></div>
      <div className="articles-posts">
        <h3>Blog</h3>
        {PostListAll?.length === 0
          ? "Data Loading..."
          : PostListAll.map((post, index) => {
              return <PostData post={post} index={index} inlist={true} />
            })}
      </div>
      <hr />
    </div>
  )
}

export default Articles

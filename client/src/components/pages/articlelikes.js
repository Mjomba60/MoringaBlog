import React, { useState, useEffect } from "react";

function ArticleLikes({ articleId }) {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    fetchArticleLikes();
  }, []);

  const fetchArticleLikes = async () => {
    try {
      const response = await fetch(`http://localhost:9292/articles/${articleId}/interaction`, {
        method: "POST", // Change the method to POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ article_id: articleId }), // Pass the article ID in the request body
      });
      const data = await response.json();
      setLikes(data);
    } catch (error) {
      console.error("Error fetching article likes:", error);
    }
  };

  return (
    <div>
      <h2>Likes for Article {articleId}</h2>
      <ul>
        {likes.map((like) => (
          <li key={like.id}>
            User ID: {like.user_id}, Interaction Type: {like.interaction_type}
          </li>
        ))}
      </ul>
      <button>Like ({likes.filter(like => like.interaction_type === 'like').length})</button>
      <button>Dislike ({likes.filter(like => like.interaction_type === 'dislike').length})</button>
    </div>
  );
}

export default ArticleLikes;

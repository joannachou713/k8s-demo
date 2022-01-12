import PostItem from './post_item.jsx'
import React, { useState, useEffect } from 'react';
import axios from "axios"

function PostContainer() {
  const [postlist, setPostlist] = useState([]);

  useEffect(async ()=>{
    // add axios
    const result = await axios.get("http://localhost:8000/api/blog/")
    const retrieved_posts = result.data
    console.log(retrieved_posts)
    const post_doms = retrieved_posts.map(x => (
      <PostItem title={x.title} id={x.id} preview={x.content.substring(0,5)}/>
    ))
    if(!postlist.length) setPostlist(post_doms)
  });

  return (
    <div className="post-container">
    <div className="fs-4 mb-3">All Posts</div>
    <div className="d-flex flex-wrap">{postlist}</div>
    </div>
  );
}

export default PostContainer;

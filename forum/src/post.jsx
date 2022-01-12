import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios"
import NewComment from "./newcomment.jsx"

function Post(props) {
  let params = useParams();

  const [info, setInfo] = useState({
    comments: [],
    post: ''
  });

  useEffect(async ()=>{
    // add post content
    const post_result = await axios.get(`http://localhost:8000/api/blog/${params.postId}`)
    const post_dom = (<>
      <div className="fs-3">{post_result.data.title}</div>
      <div className="mt-3">{post_result.data.content}</div>
      </>
    )
    // add comment
    const result = await axios.get("http://localhost:8000/api/comment/")
    const retrieved_comments = result.data.filter(d => d.blog==params.postId)
    console.log(retrieved_comments)
    const comment_doms = retrieved_comments.length ? (retrieved_comments.map(x => {
      const time = new Date(x.comment_time).toLocaleString()
      console.log(time)
      return (
        <div className="d-flex row my-2 py-2" style={{ backgroundColor: '#CCEEFF'}}>
          <div className="col-2" style={{ color: '#0044bb'}}>{x.user}</div>
          <div className="col-6">{x.text}</div>
          <div className="col-4">{time}</div>
        </div>
      )})
    ):(<div className="text-secondary mt-3">No comments yet</div>)
    console.log(comment_doms)
    if(info.comments.length == 0 && info.post.length == 0) setInfo({comments: comment_doms, post: post_dom})
  });

  const { post, comments } = info

  return (
    <div className="post">
      <div className="mb-4">{post}</div>
    <hr/>
      <div className="mt-3 fw-bold" style={{ color: '#0044bb'}}>comments section</div>
      {comments}

      <NewComment blog_id={params.postId}/>
    </div>
  );
}

export default Post;

import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostContainer from './post_container.jsx';
import Post from './post.jsx';
import Nav from './nav.jsx';
import Profile from './profile.jsx';
import './App.css';
import React, { Component } from "react";

function App() {
  return (
    <>
      <Nav/>
      <div className='container py-5'>
        <BrowserRouter>
          <Routes>
              <Route index element={<PostContainer/>}/>
              <Route path="post/:postId" element={<Post />}/>
              <Route path="profile" element={<Profile />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

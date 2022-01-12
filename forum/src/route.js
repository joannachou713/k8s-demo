import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Component } from "react";

import App from './App.js';
import Nav from './nav.jsx';
import PostContainer from './post_container.jsx';
import Post from './post.jsx';

export function route() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route index element={<PostContainer/>}/>
          <Route path="post" element={<Post title="123123"/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import React, { Component } from 'react';
import axios from "axios"

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
    };
  }
  handleFieldChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  newPost = (e) => {
    e.preventDefault();
    let { title, content } = this.state;
    let formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("blog_type", 1);
    for (var value of formData.values()) {
      console.log(value);
    }

    axios
      .post('http://localhost:8000/api/blog/', formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
      })
      .catch((error) => {
      console.error(error);
        alert("Post failed");
      });
  };
  render() {
    return (
      <div className="mt-5">
      <div className="fw-bolder">New Post</div>
        <form onSubmit={this.newPost} className="bg-light-block d-flex flex-column justify-content-center">
          <div className="form-group mt-2">
            <div className="content-color mb-2">Title</div>
            <input
              className="form-control"
              type="text"
              onChange={(e) => this.handleFieldChange(e, "title")}
              placeholder="Title"
            />
          </div>

          <div className="mt-3 form-group">
            <div className="content-color mb-2">Content</div>
            <input
              className="form-control"
              type="textarea"
              style={{ height: '200px' }}
              placeholder="content"
              onChange={(e) => this.handleFieldChange(e, "content")}
            />
          </div>
          <div className="form-group">
            <button
              className="form-control btn btn-primary my-3"
              type="submit"
              style={{width: '80px'}}
              onClick={(e) => this.newPost(e)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewPost;

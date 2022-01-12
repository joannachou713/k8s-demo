import React, { Component } from 'react';
import axios from "axios"

class NewComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }
  handleFieldChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  newPost = (e) => {
    e.preventDefault();
    let { content } = this.state;
    let formData = new FormData();
    formData.append("text", content);
    formData.append("blog_id", this.props.blog_id);
    for (var value of formData.values()) {
      console.log(value);
    }

    axios
      .post('http://localhost:8000/api/comment/', formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
      })
      .catch((error) => {
      console.error(error);
        alert("Comment failed");
      });
  };
  render() {
    return (
      <div className="mt-5">
      <div className="fw-bolder">New Comment</div>
        <form onSubmit={this.newPost} className="bg-light-block d-flex flex-column justify-content-center">
          <div className="mt-3 form-group">
            <div className="content-color mb-2">Content</div>
            <input
              className="form-control"
              type="textarea"
              style={{ height: '100px' }}
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

export default NewComment;

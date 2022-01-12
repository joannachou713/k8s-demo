import React, { Component } from "react";
import axios from "axios";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: "http://localhost:8000/api/token/",
      username: "",
      password: "",
      logged_in: localStorage.getItem("token") ? true : false,
    };
  }
  handleFieldChange = (e, field) => {
    this.setState({ [field]: e.target.value }, console.log("changed"));
  };

  login = (e) => {
    e.preventDefault();
    let { api, username, password } = this.state;
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    axios
      .post(api, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        let { data } = res;
        console.log(data);
        localStorage.setItem("token", data.access);
        this.setState({
          logged_in: true,
        });
        alert("登入成功!");
        window.location.href = "/";
      })
      .catch((error) => {
      console.error(error);
        alert("登入失敗，請檢查填寫欄位！");
      });
  };

  render() {
    return (
      <div className="expand-full d-flex  justify-content-center align-items-center">
        <form onSubmit={this.login} className="container account-entry rounded bg-light-block d-flex flex-column align-items-center justify-content-center p-5">
          <h1 className="text-center main-title">登入</h1>
          <div className="form-group mt-4">
            <div className="content-color mb-2">登入帳號</div>
            <input
              className="form-control"
              type="text"
              onChange={(e) => this.handleFieldChange(e, "username")}
              placeholder="使用者名稱"
            />
          </div>

          <div className="form-group">
            <div className="content-color mb-2">密碼</div>
            <input
              className="form-control"
              type="password"
              placeholder="密碼"
              onChange={(e) => this.handleFieldChange(e, "password")}
            />
          </div>
          <div className="form-group m-2">
            <button
              className="form-control btn btn-main my-3"
              type="submit"
              onClick={(e) => this.login(e)}
            >
              登入
            </button>
          </div>
          <little className="text-sm-center content-color m-0">
            還沒註冊嗎? <br/>
            <a href="/signup">

              <little style={{ color: "#29b4be", textDecoration: "underline"}}>
                前往註冊
              </little>
            </a>
          </little>
        </form>
      </div>
    );
  }
}

export default SignIn;

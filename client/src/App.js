import { useEffect, useState } from "react";
import { Router, navigate } from "@reach/router";
import CreatePost from "./CreatePost";
import CreateUser from "./CreateUser";
import Posts from "./Posts";
import Post from "./Post";
import UserProfile from "./UserProfile";
import AuthService from "./AuthService";
import Login from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import io from "socket.io-client";

const API_URL = process.env.REACT_APP_API;
const authService = new AuthService(
  `https://awp-exam-final.herokuapp.com/api/users/authenticate`
);

function App() {
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [user, setUser] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = io(`https://awp-exam-final.herokuapp.com/api/socket`);
    console.log(socket);

    socket.on("newPost", (post) => {
      setData((data) => [...data, post]);
    });

    socket.on("newAnswer", (id, answer) => {});

    async function getData() {
      const url = `https://awp-exam-final.herokuapp.com/api/posts`;
      const response = await fetch(url);
      const data = await response.json();
      if (category === "") {
        setData(data.slice(0, 14));
      } else {
        setData(data.filter((u) => u.category === category).slice(0, 14));
      }
    }
    getData();

    async function getCategories() {
      const url = `https://awp-exam-final.herokuapp.com/api/categories`;
      const response = await fetch(url);
      const data = await response.json();
      setCategories(data);
    }
    getCategories();
    setUser(authService.getUser());
  }, [counter]);

  async function login(username, password) {
    try {
      const resp = await authService.login(username, password);
      console.log("Authentication:", resp);
      console.log("Authentication:", resp.Token);
      setCounter(counter + 1);
      setUser(username);
    } catch (e) {
      console.log("Login:", e);
    }
  }

  function addPost(title, desc, category) {
    console.log(title, desc);

    const data = {
      title: title,
      desc: desc,
      category: category,
      creator: user,
    };
    const postData = async () => {
      const url = `https://awp-exam-final.herokuapp.com/api/posts/addpost`;

      const response = await authService.fetch(url, {
        method: "POST",

        body: JSON.stringify(data),
      });
      const reply = await response.json();
      console.log(reply);
      if (reply.error) {
        setError(reply.error);
        return navigate("login");
      }
      navigate("/");
      setCounter(counter + 1);
      console.log(reply.error);
    };
    postData();
  }

  function addAnswer(id, desc) {
    const data = {
      id: id,
      desc: desc,
      creator: user,
    };
    const postData = async () => {
      const url = `https://awp-exam-final.herokuapp.com/api/posts/addanswer`;

      const response = await authService.fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const reply = await response.json();
      console.log(reply);
      if (reply.error) {
        setError(reply.error);
        return navigate("../login");
      }
      setCounter(counter + 1);
      console.log(reply.error);
    };
    postData();
  }

  function likeAnswer(postID, answerID) {
    console.log(postID, answerID);

    const data = {
      postID: postID,
      answerID: answerID,
    };
    const postData = async () => {
      const url = `https://awp-exam-final.herokuapp.com/api/posts/likeanswer`;

      const response = await authService.fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const reply = await response.json();
      console.log(reply);
      if (reply.error) {
        setError(reply.error);
        return navigate("../login");
      }
      setCounter(counter + 1);
      console.log(reply.error);
    };
    postData();
  }

  function registerUser(username, password) {
    console.log(username, password);

    const data = {
      username: username,
      password: password,
    };
    const postData = async () => {
      const url = `https://awp-exam-final.herokuapp.com/api/users/create`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const reply = await response.json();
      console.log(reply);
    };
    postData();
  }

  function getPost(_id) {
    return data.find((r) => r._id === _id);
  }

  function getUserPosts(user) {
    return data.filter((u) => u.postCreator === user);
  }

  function getUserComments(user) {
    return data.filter((comments) =>
      comments.answers.some((comment) => comment.answerCreator === user)
    );
  }

  function filterByTopic(category) {
    setCategory(category);
    setCounter(counter + 1);
  }

  function logout() {
    authService.logout();
    setCounter(counter + 1);
  }

  return (
    <>
      <div class="container">
        <Navbar
          categories={categories}
          filterByTopic={filterByTopic}
          authService={authService}
          Logout={logout}
        ></Navbar>
        <Router>
          <Posts path="/" data={data}></Posts>
          <Post
            path="/post/:_id"
            getPost={getPost}
            addAnswer={addAnswer}
            likeAnswer={likeAnswer}
          />
          <UserProfile
            path="/userprofile/:user"
            getUserPosts={getUserPosts}
            getUserComments={getUserComments}
          />
          <CreatePost
            path="/createpost"
            categories={categories}
            addPost={addPost}
            authService={authService}
          />
          <CreateUser path="/register" registerUser={registerUser} />
          <Login path="/login" login={login} error={error} />
        </Router>
      </div>
    </>
  );
}

export default App;

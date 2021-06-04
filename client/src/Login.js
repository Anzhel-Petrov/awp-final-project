import { useState } from "react";

function Login(props) {
  const { login, error } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h3>Login</h3>
      {error && (
        <div style={{ color: "red" }}>
          {error} - In order to create a post, answer or vote you need to be
          logged in.
        </div>
      )}
      <p>
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value.trim());
          }}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value.trim());
          }}
        />
      </p>
      <button
        type="button"
        onClick={() => {
          login(username, password);
        }}
      >
        Login!
      </button>
    </>
  );
}

export default Login;

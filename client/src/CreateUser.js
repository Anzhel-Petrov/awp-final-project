import React, { useState } from "react";

function CreateUser(props) {
  const { registerUser } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h3>Register</h3>
      <p>
        <input
          type="text"
          placeholder="Enter username"
          onChange={(event) => {
            setUsername(event.target.value.trim());
          }}
        />
      </p>
      <p>
        <input
          type="passsword"
          placeholder="Enter password"
          onChange={(event) => {
            setPassword(event.target.value.trim());
          }}
        />
      </p>
      <button
        type="button"
        onClick={() => {
          if (!username || !password) {
            alert("Username or password empty!");
          } else {
            registerUser(username, password);
          }
        }}
      >
        Register!
      </button>
    </>
  );
}

export default CreateUser;

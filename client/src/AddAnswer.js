import React, { useState } from "react";

function AddAnswer(props) {
  const { addAnswer, postID } = props;
  const [answerDesc, setDesc] = useState("");

  const [answerDescErr, setDescErr] = useState({});

  const answerValidation = () => {
    const answerDescErr = {};
    let isValid = true;

    if (!answerDesc.trim()) {
      answerDescErr.answerDescErrNone = "Answer description cannot be empty";
      isValid = false;
    }

    setDescErr(answerDescErr);
    return isValid;
  };

  return (
    <>
      <h3>Add Answer</h3>
      <p>
        <textarea
          type="text"
          placeholder="Write your answer here"
          rows="10"
          cols="50"
          onChange={(event) => {
            setDesc(event.target.value);
          }}
        />
      </p>
      {Object.keys(answerDescErr).map((key) => {
        return <div style={{ color: "red" }}>{answerDescErr[key]}</div>;
      })}
      <br></br>
      <button
        onClick={(event) => {
          event.preventDefault();
          const isValid = answerValidation();
          if (isValid) {
            addAnswer(postID, answerDesc);
            setDesc("");
          }
        }}
      >
        Add Answer
      </button>
    </>
  );
}

export default AddAnswer;

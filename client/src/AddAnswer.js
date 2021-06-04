import React, { useState } from "react";

function AddAnswer(props) {
  const { addAnswer, postID } = props;
  const [answerDesc, setDesc] = useState("");
  // const [answerCre, setCreator] = useState("");

  const [answerDescErr, setDescErr] = useState({});
  // const [answerCreErr, setCreatorErr] = useState({});

  const answerValidation = () => {
    const answerDescErr = {};
    // const answerCreErr = {};
    let isValid = true;

    if (!answerDesc.trim()) {
      answerDescErr.answerDescErrNone = "Answer description cannot be empty";
      isValid = false;
    }

    // if (!answerCre.trim()) {
    //   answerCreErr.answerCreNone = "Answer creator cannot be empty";
    //   isValid = false;
    // }

    setDescErr(answerDescErr);
    // setCreatorErr(answerCreErr);
    return isValid;
  };

  return (
    <>
      <h3>Add Answer</h3>

      {/* <p>
        <input
          type="text"
          placeholder="Write your name here"
          size="50"
          onChange={(event) => {
            setCreator(event.target.value);
          }}
        />
      </p>
      {Object.keys(answerCreErr).map((key) => {
        return <div style={{ color: "red" }}>{answerCreErr[key]}</div>;
      })} */}
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
            // setCreator("");
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

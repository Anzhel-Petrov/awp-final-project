import React from "react";

function LikeAnswer(props) {
  const { postID, answerID, likeAnswer } = props;

  return (
    <>
      <button
        onClick={(event) => {
          likeAnswer(answerID, postID);
          console.log(answerID);
        }}
      >
        Vote
      </button>
    </>
  );
}

export default LikeAnswer;

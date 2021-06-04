import React from "react";
import AddAnswer from "./AddAnswer";
import LikeAnswer from "./LikeAnswer";
import { Link } from "@reach/router";

function Post(props) {
  // const {id , getPost} = props;
  // const post = getPost(_id);
  const { addAnswer, likeAnswer, error } = props;
  const post = props.getPost(props._id);
  // const hasAnswers = post.answers.length > 0;
  // console.log(post.answers.length);
  return (
    <>
      {post && (
        <>
          <div>
            <h1>Title: {post.title}</h1>
            <p>Topic: {post.category}</p>
            <p>Description: {post.postDescription}</p>
            <p>
              Author:{" "}
              <Link to={`/userprofile/${post.postCreator}`}>
                {post.postCreator}
              </Link>
            </p>
            <p>
              Date Posted:{" "}
              {new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }).format(new Date(post.postDate))}
            </p>
          </div>
          <div>
            <AddAnswer addAnswer={addAnswer} postID={post._id} />
          </div>
          <div class="answers">
            {/* {hasAnswers ? (Object.keys(post.answers).map(function(key) {
  return <div>Key: {key}, Value: {post.answers[key]}</div>;
})) : (<p> This post has now answers yet - be the first one to answer!!!</p>)} */}
            {post.answers.length > 0 ? (
              post.answers
                .sort((b, a) => new Date(a.answerDate) - new Date(b.answerDate))
                .map((i) => (
                  <>
                    <p>
                      Author:{" "}
                      <Link to={`/userprofile/${i.answerCreator}`}>
                        {i.answerCreator}
                      </Link>
                    </p>
                    <p>Answer: {i.answerDescription}</p>
                    <p>Votes: {i.vote}</p>
                    <p>
                      Anser posted on:{" "}
                      {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(i.answerDate))}
                    </p>
                    <LikeAnswer
                      likeAnswer={likeAnswer}
                      answerID={i._id}
                      postID={post._id}
                    />
                  </>
                ))
            ) : (
              <p>
                {" "}
                This post has no answers yet - be the first one to answer!!!
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Post;

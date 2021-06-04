import React from "react";
import { Link } from "@reach/router";

function Posts(props) {
  const posts = props.data.map((r) => (
    <div class="posts">
      <Link to={`/post/${r._id}`}>{r.title}</Link>
      <p>Topic: {r.category}</p>
      <p>
        Date posted:{" "}
        {new Intl.DateTimeFormat("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(r.postDate))}
      </p>
      <p>Number of answers: {r.answers.length}</p>
      <p>
        Last answer posted:{" "}
        {r.answers.length > 0
          ? new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(r.answers[r.answers.length - 1].answerDate))
          : "No answers posted yet - maybe you have the answer?"}
      </p>
      {console.log(r.answers.length)}
    </div>
  ));

  return (
    <div>
      <h1>List of Posts</h1>
      {posts}
    </div>
  );
}

export default Posts;

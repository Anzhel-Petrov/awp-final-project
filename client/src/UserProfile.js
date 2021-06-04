import React from "react";
import { Link } from "@reach/router";

function UserProfile(props) {
  const posts = props.getUserPosts(props.user);
  //   const comments = props.data.map(function (el) {
  //     el.answers = el.answers.filter(function (x) {
  //       return x.answerCreator === props.user;
  //     });
  //     return el;
  //   });
  const comments = props.getUserComments(props.user);
  console.log(comments);
  //   console.log(props.user);
  //   console.log(comments);

  return (
    <div>
      <h4>Posts list of user {props.user}:</h4>
      {posts && posts.length > 0 ? (
        <ul>
          {posts.map((i) => (
            <li>
              <Link to={`/post/${i._id}`}>{i.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no posts yet from user {props.user}</p>
      )}
      <h4>Comments list of user {props.user}:</h4>
      {comments && comments.length > 0 ? (
        <ul>
          {comments.map((i) => (
            <li>
              <Link to={`/post/${i._id}`}>{i.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no comments yet from user {props.user}</p>
      )}
    </div>
  );
}

export default UserProfile;

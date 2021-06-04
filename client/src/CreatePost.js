import React, { useState } from "react";
import { navigate } from "@reach/router";

function CreatePost(props) {
  const { addPost, categories } = props;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");

  const [titleErr, setTitleErr] = useState({});
  const [descErr, setDescErr] = useState({});
  const [categoryErr, setCategoryErr] = useState({});

  const formValidation = () => {
    const titleErr = {};
    const descErr = {};
    const categoryErr = {};
    let isValid = true;

    if (!title.trim()) {
      titleErr.titleErrNone = "Title cannot be empty";
      isValid = false;
    }

    if (!desc.trim()) {
      descErr.descErrNone = "Description cannot be empty";
      isValid = false;
    }

    if (!category.trim()) {
      categoryErr.categoryErrNone = "You need to select a category";
      isValid = false;
    }

    setTitleErr(titleErr);
    setDescErr(descErr);
    setCategoryErr(categoryErr);
    return isValid;
  };

  return (
    <>
      <h3>Add Post</h3>
      <p>
        <select
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        >
          <option>Select topic</option>
          {categories.map((categori) => (
            <option value={categori.name}>{categori.name}</option>
          ))}
        </select>
      </p>
      {Object.keys(categoryErr).map((key) => {
        return <div style={{ color: "red" }}>{categoryErr[key]}</div>;
      })}
      <p>
        <input
          type="text"
          placeholder="Write your post title here"
          size="50"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </p>
      {Object.keys(titleErr).map((key) => {
        return <div style={{ color: "red" }}>{titleErr[key]}</div>;
      })}
      <p>
        <textarea
          type="text"
          placeholder="Write your post description here"
          rows="10"
          cols="50"
          onChange={(event) => {
            setDesc(event.target.value);
          }}
        />
      </p>
      {Object.keys(descErr).map((key) => {
        return <div style={{ color: "red" }}>{descErr[key]}</div>;
      })}
      <br></br>
      <button
        onClick={(event) => {
          event.preventDefault();
          const isValid = formValidation();
          if (isValid) {
            addPost(title, desc, category);
          }
        }}
      >
        Add Post
      </button>
    </>
  );
}

export default CreatePost;

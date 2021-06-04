module.exports = (postModel) => {
  const express = require("express");
  const router = express.Router();

  /**** Routes ****/
  router.get("/", async (req, res) => {
    const posts = await postModel.getPosts();
    res.json(posts);
  });

  router.post("/likeanswer", async (req, res) => {
    const post = await postModel.likeAnswer(req.body.postID, req.body.answerID);
    res.json(post);
  });

  router.post("/addpost", async (req, res) => {
    const post = await postModel.createPost(
      req.body.title,
      req.body.desc,
      req.body.category,
      req.body.creator
    );
    res.json(post);
  });

  router.post("/addanswer", async (req, res) => {
    const post = await postModel.createAnswer(
      req.body.id,
      req.body.desc,
      req.body.creator
    );
    res.json(post);
  });

  return router;
};

module.exports = (mongoose) => {
  const postSchema = new mongoose.Schema({
    title: String,
    category: { type: String, ref: "category" },
    postDescription: String,
    postCreator: String,
    postDate: { type: Date, default: new Date() },
    answers: [
      {
        answerCreator: String,
        answerDescription: String,
        vote: { type: Number, default: 0 },
        answerDate: { type: Date, default: new Date() },
      },
    ],
  });

  const postModel = mongoose.model("post", postSchema);

  async function getPosts() {
    try {
      return await postModel.find().sort("-postDate");
    } catch (error) {
      console.error("getPosts:", error.message);
      return {};
    }
  }

  async function likeAnswer(answerID, postID) {
    const post = await postModel.findById(postID);
    // let vote = post.answers.find(o => o._id === answerID);
    const index = post.answers.findIndex((obj) => obj.id === answerID);
    post.answers[index].vote += 1;
    return post.save();
  }

  async function createPost(title, desc, category, creator) {
    let post = new postModel({
      title: title,
      postDescription: desc,
      category: category,
      postCreator: creator,
    });
    return post.save();
  }

  async function createAnswer(id, desc, creator) {
    const post = await postModel.findById(id);
    post.answers.push({
      answerCreator: creator,
      answerDescription: desc,
    });
    return post.save();
  }

  async function bootstrap(count = 50) {
    let l = (await getPosts()).length;
    console.log("Number of posts : ", l);

    if (l === 0) {
      console.log("Generating new posts... ");
      let newQ = [];
      for (let i = 0; i < count; i++) {
        let newQuestion1 = new postModel({
          title: `Dummy post number ${i + 1} with topic REACT`,
          category: "REACT",
          postDescription: `Why REACT is the best library?`,
          postCreator: "john",
          answers: [
            {
              answerCreator: "anzhel",
              answerDescription: `Dummy post number ${i + 1} with topic REACT`,
            },
          ],
        });
        newQ.push(newQuestion1.save());
        let newQuestion2 = new postModel({
          title: `Dummy post number ${i + 1} with topic MERN Stack`,
          category: "MERN Stack",
          postDescription: `The MERN Stack is the best stack there - change my mind`,
          postCreator: "john",
          answers: [
            {
              answerCreator: "anzhel",
              answerDescription: `Dummy post number ${
                i + 1
              } with topic MERN Stack`,
            },
          ],
        });
        newQ.push(newQuestion2.save());
        let newQuestion3 = new postModel({
          title: `Dummy post number ${i + 1} with topic Android Kotlin`,
          category: "Android Kotlin",
          postDescription: `Are native apps dead? Did the progressive apps killed them completely?`,
          postCreator: "michael",
          answers: [
            {
              answerCreator: "kristian",
              answerDescription: `Dummy post number ${
                i + 1
              } with topic Android Kotlin`,
            },
          ],
        });
        newQ.push(newQuestion3.save());
        let newQuestion4 = new postModel({
          title: `Dummy post number ${i + 1} with topic ASP.NET MVC Core`,
          category: "ASP.NET",
          postDescription: `How popular is this framework today?`,
          postCreator: "michael",
          answers: [
            {
              answerCreator: "kristian",
              answerDescription: `Dummy post number ${
                i + 1
              } with topic ASP.NET`,
            },
          ],
        });
        newQ.push(newQuestion4.save());
      }
      console.log("New posts generated: " + newQ.length);
      return Promise.all(newQ);
    }
  }

  return {
    getPosts,
    likeAnswer,
    createPost,
    createAnswer,
    bootstrap,
  };
};

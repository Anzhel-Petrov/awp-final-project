module.exports = (mongoose) => {
  const categorySchema = new mongoose.Schema({
    name: String,
  });

  const categoryModel = mongoose.model("category", categorySchema);

  async function getCategories() {
    try {
      return await categoryModel.find();
    } catch (error) {
      console.error("getCategories:", error.message);
      return {};
    }
  }

  async function createCategory(name) {
    let category = new categoryModel({
      name: name,
    });
    try {
      return await category.save();
    } catch (error) {
      console.error("createCategory:", error.message);
    }
  }

  async function bootstrap(count = 1) {
    let l = (await getCategories()).length;
    console.log("Number of topics : ", l);

    if (l === 0) {
      console.log("Generating new topics... ");
      let newT = [];
      for (let i = 0; i < count; i++) {
        let newTopic1 = new categoryModel({ name: `REACT` });
        newT.push(newTopic1.save());

        let newTopic2 = new categoryModel({ name: `MERN Stack` });
        newT.push(newTopic2.save());

        let newTopic3 = new categoryModel({ name: `Android Kotlin` });
        newT.push(newTopic3.save());

        let newTopic4 = new categoryModel({ name: `ASP.NET` });
        newT.push(newTopic4.save());
      }
      console.log("New topics generated: " + newT.length);
      return Promise.all(newT);
    }
  }

  return {
    getCategories,
    createCategory,
    bootstrap,
  };
};

module.exports = (mongoose, secret) => {
  const jwt = require("jsonwebtoken");
  const bcrypt = require("bcryptjs"); // Used for hashing passwords!
  const userSchema = new mongoose.Schema({
    username: String,
    password: String,
  });

  const userModel = mongoose.model("user", userSchema);

  async function getUsers() {
    try {
      return await userModel.find();
    } catch (error) {
      console.error("getUsers:", error.message);
      return {};
    }
  }

  async function createUser(username, password, callback) {
    if (!username || !password) {
      callback(401, "Username or password missing!");
      return;
    }
    const user = await userModel.findOne({
      username: username.trim(),
    });
    if (!user) {
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function (err, hash) {
          if (err) reject(err);
          else resolve(hash);
        });
      });
      let newUser = new userModel({
        username: username,
        password: hashedPassword,
      });
      try {
        await newUser.save();
        return callback(`User ${username} succesfully created!`);
      } catch (error) {
        console.error("Error saving new user:", error.message);
        return callback(`Error in code: ${error.message}`);
      }
    } else {
      callback(403, "Username already exist!");
    }
  }

  async function findUser(username) {
    try {
      return await userModel.findOne({ username: username });
    } catch (error) {
      console.error("getUsers:", error.message);
      return {};
    }
  }

  async function authenticate(username, password, callback) {
    if (!username || !password) {
      callback(401, "Username or password missing!");
      return;
    }
    const user = await userModel.findOne({ username: username });
    if (user) {
      // If the user is found
      if (bcrypt.compareSync(password, user.password)) {
        const payload = { username: username };
        const token = jwt.sign(payload, secret, {
          algorithm: "HS512",
          expiresIn: "1h",
        });
        callback(`User '${username}' authenticated successfully`, token);
      } else {
        callback(401, "Password mismatch!");
      }
    } else {
      callback(403, "User not found!");
    }
  }

  async function bootstrap() {
    let l = (await getUsers()).length;
    console.log("Number of users : ", l);
    let newU = [];
    if (l === 0) {
      console.log("Generating new topics... ");
      const users = [
        { username: "anzhel", password: "123" },
        { username: "john", password: "password" },
        { username: "kristian", password: "god" },
        { username: "michael", password: "sex" },
      ];

      users.forEach(async (user) => {
        const hashedPassword = await new Promise((resolve, reject) => {
          bcrypt.hash(user.password, 10, function (err, hash) {
            if (err) reject(err);
            else resolve(hash);
          });
        });

        let newUser = new userModel({
          username: user.username,
          password: hashedPassword,
        });
        newU.push(newUser.save());
        console.log(`Hash generated for ${user.username}:`, user); // Logging for debugging purposes
      });
    }
  }

  return {
    getUsers,
    authenticate,
    findUser,
    bootstrap,
    createUser,
  };
};

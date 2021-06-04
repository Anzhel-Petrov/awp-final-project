/**** Node.js libraries *****/
const path = require("path");

/**** External libraries ****/
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const checkJwt = require("express-jwt");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const appName = "Server API";
const port = process.env.PORT || 8080;

/**** Configuration ****/
dotenv.config();
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost/posts";
server.listen(port, () => console.log(`${appName} running on port ${port}!`));

io.of("/api/socket").on("connection", (socket) => {
  console.log("socket.io: User connected", socket.id);

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected", socket.id);
  });
});

io.on("connection", (socket) => {
  console.log("We have new connection!!");
});

// Connect db
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB Connected");
  const postsChangeStream = connection.collection("posts").watch();

  postsChangeStream.on("change", (change) => {
    console.log(change.operationType);
    switch (change.operationType) {
      case "insert":
        const post = {
          _id: change.fullDocument._id,
          postDate: change.fullDocument.postDate,
          title: change.fullDocument.title,
          postDescription: change.fullDocument.postDescription,
          postCreator: change.fullDocument.postCreator,
          answers: change.fullDocument.answers,
        };

        console.log(post);

        io.of("/api/socket").emit("newPost", post);
        break;

      case "update":
        const answer = {
          answers: change.updateDescription.updatedFields,
        };

        console.log(answer);
        console.log(change.documentKey);
        io.of("/api/socket").emit("newAnswer", change.documentKey._id, answer);
        break;
    }
  });
});

const secret = process.env.SECRET || "the cake is a lie";

// Create data
const postModel = require("./postModel")(mongoose);
postModel.bootstrap();
const userModel = require("./userModel")(mongoose, secret);
userModel.bootstrap();
const categoryModel = require("./categoryModel")(mongoose);
categoryModel.bootstrap();

const openPaths = [
  { url: "/api/users/authenticate", methods: ["POST"] },

  { url: "/api/users/create", methods: ["POST"] },

  /^(?!\/api).*/gim,

  { url: /\/api\/posts\.*/gim, methods: ["GET"] },
  { url: /\/api\/categories\.*/gim, methods: ["GET"] },
];

app.use(
  checkJwt({ secret, algorithms: ["HS512"] }).unless({ path: openPaths })
);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.message });
  } else {
    next();
  }
});

// Require routes
const userRoutes = require("./userRoutes")(userModel);
const routes = require("./routes")(postModel); // Inject mongoose into routes module
const categoryRoutes = require("./categoryRoutes")(categoryModel);

// Add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("combined"));
app.use(cors());
app.use(express.static(path.resolve("..", "client", "build")));

// Add routes
app.use("/api/posts", routes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);

// "Redirect" all non-API GET requests to React's entry point (index.html)
app.get("*", (req, res) =>
  res.sendFile(path.resolve("..", "client", "build", "index.html"))
);

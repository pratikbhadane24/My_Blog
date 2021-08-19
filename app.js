const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")

const homeStartingContent = "I welcome you to my Blog. I really hope you and your family are well😁. I'm a Student and an Everyday Coder! I'm proficient in Python🐍(Python is ❤), HTML, CSS, Bootstrap. I know C, C++, JavaScript, Node.JS, Express Framework, EJS, etc. I'm constantly and consistently learning new things and trying to improve as a Developer.";
const aboutContent = "I'm passionate about exploring ways of Tech Companies making lives of people easier. And I'm hoping to get insights from a professionals with experience in this field. I'm learning many things right now so that I can decide my future in one of them. ";
const contactContent = "Choose from these platform:";

const app = express();

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", {
    StartingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function (req, res) {
  res.render("about", { myAboutContent: aboutContent })
});

app.get("/contact", function (req, res) {
  res.render("contact", { Contact: contactContent })
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post)

  res.redirect("/")
});

app.get("/posts/:postName", function (req, res) {
  const requested_title = _.lowerCase(req.params.postName);


  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (requested_title === storedTitle) {
      res.render("post", {
        pagetitle: post.title,
        description: post.content
      })
    };
  });
});








app.listen(3000, function () {
  console.log("Server started on port 3000");
});

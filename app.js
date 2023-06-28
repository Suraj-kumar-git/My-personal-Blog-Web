const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const staticContent1 = "Blogging has revolutionized the way we share information and connect with\
others online. It has transformed the traditional publishing landscape,";
const staticContent2 = "React and Angular are two popular JavaScript frameworks widely used for\
building modern web applications. While both offer powerful tools for front-end development,";
const staticContent3 = "Spring Boot is a powerful Java-based framework used for building\
enterprise-grade applications. It provides";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let dPosts = [{
  title:  "Introduction to Blogging and its Impact",
  content: staticContent1
},{
  title: "React vs Angular",
  content: staticContent2
},{
  title: "Why, When, Uses and Features of SpringBoot",
  content: staticContent3
}];

let posts=[];
app.get("/", function(req, res){
  res.render("home", {
    dPosts: dPosts,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about");
});

app.get("/contact", function(req, res){
  res.render("contact");
});

app.get("/compose", function(req, res){
  res.render("compose");
});
app.get("/blogs/blogging", function(req, res){
  res.render("first");
});
app.get("/blogs/react-vs-angular", function(req, res){
  res.render("second");
});
app.get("/blogs/springboot", function(req, res){
  res.render("third");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

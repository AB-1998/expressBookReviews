const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];
const authenticatedUser = (username,password)=>{
    let validusers = users.filter((user)=>{
      return (user.username === username && user.password === password)
    });
    if(validusers.length > 0){
      return true;
    } else {
      return false;
    }
  }
const isValid = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }



//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
   if (authenticatedUser(username,password)) {
      let accessToken = jwt.sign({
        data: username
      }, 'access');
      req.session.authorization = {
        accessToken
    }
    return res.status(200).send("User successfully logged in");
    } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
    }});
    

// Add a book review
regd_users.put("/auth/review/:i", (req, res) => {
  const i=req.params.i;
  const review=req.query.review;
  let b=jwt.verify(req.session.authorization['accessToken'],'access').data
  
  
  books[i].reviews[b]=review

  res.json(`the book review had add/update for the user ${b}`)
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn=req.params.isbn;
    
    let b=jwt.verify(req.session.authorization['accessToken'],'access').data
    
    
   delete books[isbn].reviews[b]
  
    res.json(`the book review had delete for the user ${b}`)
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

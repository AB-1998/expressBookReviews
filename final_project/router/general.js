const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!doesExist(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
  });

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  
  return res.status(300).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn =req.params.isbn;
  return res.status(300).json(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let auth= req.params.author;
  let list= Object.keys(books)
  let b= list.filter((s)=> books[s].author==auth)
  
   res.status(200).json(books[b]);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const auth= req.params.title;
    const list= Object.keys(books)
    const b= list.filter((s)=> books[s].title===auth)
    
     res.status(200).json(books[b]);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const auth= req.params.isbn;
    const list= books[auth].reviews;
    
     res.status(200).json(list);
});

module.exports.general = public_users;

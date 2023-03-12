const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!isValid(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
  });

// Get the book list available in the shop
public_users.get('/',function (req, res,next) {
   new Promise((resolve,reject)=>{
       if(books){
           resolve()
       }else{
           reject()
       }
   }).then(()=>{res.status(201).json(books)}).catch(()=>{throw new Error("eroor ")})
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn =req.params.isbn;
  new Promise((resolve,reject)=>{
    if(books[isbn]!=0){
        resolve()
    }else{
        reject()
    }
}).then(()=>{res.status(201).json(books[isbn])}).catch(()=>{throw new Error("not found the book ")})
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let auth= req.params.author;
  let list= Object.keys(books)
  let b= list.filter((s)=> books[s].author==auth)
  new Promise((resolve,reject)=>{
    if(b.length>0){
        resolve()
    }else{
        reject()
    }
}).then(()=>{res.status(201).json(book[b])}).catch(()=>{throw new Error("not found the book ")})
   
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const auth= req.params.title;
    const list= Object.keys(books)
    const b= list.filter((s)=> books[s].title===auth)
    new Promise((resolve,reject)=>{
        if(b.length>0){
            resolve()
        }else{
            reject()
        }
    }).then(()=>{res.status(201).json(book[b])}).catch(()=>{throw new Error("not found the book ")})
       
     
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const auth= req.params.isbn;
    const list= books[auth].reviews;
    
     res.status(200).json(list);
});

module.exports.general = public_users;

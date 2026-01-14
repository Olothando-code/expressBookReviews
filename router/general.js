const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');
 
 
public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
 
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
 
  if (users.find(user => user.username === username)) {
    return res.status(409).json({ message: "Username already exists" });
  }
 
  users.push({ username, password });
  return res.status(200).json({ message: "User registered successfully" });
 
    //return res.status(300).json({message: "Yet to be implemented"});
});
 
// Get the book list available in the shop
public_users.get('/', async function (req, res) { 
    try { 
        const response = await axios.get('http://localhost:5000/books'); // adjust path if needed 
return res.status(200).json(response.data); 
} catch (error) { 
    return res.status(500).json({ message: "Error fetching books", error: error.message }); } 
//return res.status(300).json({message: "Yet to be implemented"});
});
 
// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  //Write your code here
  try {
    const isbn = req.params.isbn;
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    return res.status(200).json(response.data);
  } catch (error) {
  return res.status(500).json({ message: "Error fetching book details by ISBN" });}
  //return res.status(300).json({message: "Yet to be implemented"});
}); 
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  //Write your code here
  try {
    const author = req.params.author;
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by author" });
  }
});
  /*const author = req.params.author;
  let result = [];
 
  const keys = Object.keys(books);
 
  keys.forEach(key => {
    if (books[key].author === author) {
      result.push(books[key]);
    }
  });
 
  return res.status(200).json(result);
//return res.status(300).json({message: "Yet to be implemented"});
});*/
 
// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
    //Write your code here
    try {
        const title = req.params.title;
        const response = await axios.get(`http://localhost:5000/title/${title}`);
        return res.status(200).json(response.data);
      } catch (error) {
        return res.status(500).json({ message: "Error fetching books by title" });
      }
    });
  /*const title = req.params.title;
  let result = [];
 
  const keys = Object.keys(books);
 
  keys.forEach(key => {
    if (books[key].title === title) {
      result.push(books[key]);
    }
  });
 
  return res.status(200).json(result);
  //return res.status(300).json({message: "Yet to be implemented"});
});*/
 
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
 
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn].reviews);
 
//return res.status(300).json({message: "Yet to be implemented"});
});
 
module.exports.general = public_users;
const express = require("express");
const router = express.Router();
const { getPosts, createPost, deletePost, editPost, findPost} = require("../controllers/postController")
router.get("/posts", getPosts);
router.post("/create", createPost);
router.delete("/delete/:id", deletePost);
router.patch("/edit/:id", editPost);
router.get("/find/:query?", findPost);



module.exports = router;
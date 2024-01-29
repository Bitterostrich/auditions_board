const express = require("express");
const router = express.Router();
const { getAllPosts, createPost, deletePost, editPost, findPost} = require("../controllers/postController")
router.get("/posts", getAllPosts);
router.post("/create", createPost);
router.delete("/delete/:id", deletePost);
router.patch("/edit/:id", editPost);
router.get("/find/:query?", findPost);



module.exports = router;
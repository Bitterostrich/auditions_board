const createError = require('http-errors')
// const uuid = require('uuid');
// const posts = []
require('dotenv').config()


const Post = require("../models/postModel")
const axios = require('axios');


//End of API code


exports.getPosts = async function (req, res) {
  try {
    const postItems = await Post.find();
    res.send(postItems);
  } catch (err) {
    return next(createError(500, err.message));
  }
};

exports.createPost = async function (req, res, next) {
  try {
    if (!req.body.postTitle || !req.body.postType || !req.body.postTime || !req.body.postDate  || !req.body.postLocation || !req.body.postDescription) {
        return next(createError(400, "All fields required"));
    }
// Call the getRandom function to get a random post
      // const randomPost = await getRandom();

    const postItem = new Post({
      postTitle: req.body.postTitle,
      postType: req.body.postType,
      postDate: req.body.postDate,
      postTime: req.body.postTime,
      postLocation: req.body.postLocation,
      postDescription: req.body.postDescription,
      // random_joke: randomPost
    });


 
  
    await postItem.save();

    res.send(postItem);
  } catch (err) {
    return next(createError(500, err.message));
  }
};

exports.deletePost = async function (req, res, next) {
  try {
    const postItemToDelete = await Post.findByIdAndDelete(req.params.id);
    if (!postItemToDelete) {
      return next(createError(404, "No post with that id."));
    }
    res.send({ result: true });
  } catch (err) {
    return next(createError(500, err.message));
  }
};


exports.editPost = async function (req, res, next) {
  try {
    const updatedPostItem = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedPostItem) {
      return next(createError(404, "No post with that id"));
    }

    res.send({ result: true, updatedPostItem });
  } catch (err) {
    return next(createError(500, err.message));
  }
};


exports.findPost = async function (req, res, next) {
  try {
    const searchTerm = req.params.query.toLowerCase();
    const isObjectId = /^[0-9a-fA-F:]{24}$/.test(searchTerm);

    const query = {
      $or: [
        isObjectId ? { _id: searchTerm } : null,
        { postTitle: { $regex: new RegExp(searchTerm, 'i') } },
        { postType: { $regex: new RegExp(searchTerm, 'i') } },
        { postDate: { $regex: new RegExp(searchTerm, 'i') } },
        { postTime: { $regex: new RegExp(searchTerm, 'i') } },
        { postLocation: { $regex: new RegExp(searchTerm, 'i') } },
        { postDescription: { $regex: new RegExp(searchTerm, 'i') } }
      ].filter(Boolean)
    };

    // when searching for alcohol %, for example '3%' you must write '3%25' so that the URL reads it as a % sign.

    const postItems = await Post.find(query);

    if (!postItems || postItems.length === 0) {
      return next(createError(404, 'No post found with the specified criteria.'));
    }

    res.send(postItems);
  } catch (err) {
    return next(createError(500, err.message));
  }
};


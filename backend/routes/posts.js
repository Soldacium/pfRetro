const express = require('express');
const router = express.Router();
const Post = require('../models/post');


router.post('', (req, res, next) => {
    const post = new Post({
        name: req.body.name,
        description: req.body.description
    });
    post
    .save()
    .then(
        createdPost => res.status(200).json(createdPost),
        err => {res.status(500).json(err); console.error(err)}
    )
})

router.post('/:id/pictures',(req,res,next) => {
    Post
    .updateOne({_id: req.params.id},{$push: {pictures: req.body.pictureId}})
    .then(
        updateResult => res.status(200).json(updateResult),
        err => {res.status(500).json(err); console.error(err)}
    );
})

router.get('',(req,res,next) => {
    Post
    .find()
    .then(
        posts => res.status(200).json(posts),
        err => {res.status(500).json(err); console.error(err)}
    );
});

router.get('/:id',(req,res,next) => {
    Post
    .findOne({_id: req.params.id})
    .then(
        post => res.status(200).json(post),
        err => {res.status(500).json(err); console.error(err)}
    );
});

router.delete('/:id',(req,res,next) => { 
    Post
    .deleteOne({_id: req.params.id})
    .then(
        deleteResult => res.status(200).json(deleteResult),
        err => {res.status(500).json(err); console.error(err)}
    );
});

router.delete('/:id/pictures/:pictureId',(req,res,next) => { 
    Post
    .updateOne({_id: req.params.id},{$pull: {pictures: req.params.pictureId}})
    .then(
        updateResult => res.status(200).json(updateResult),
        err => {res.status(500).json(err); console.error(err)}
    );
});

router.patch('/:id', (req,res,next) => {
    Post
    .updateOne({_id: req.params.id},req.body.post)
    .then(
        updateResult => res.status(200).json(updateResult),
        err => {res.status(500).json(err); console.error(err)}
    )
})

module.exports = router;
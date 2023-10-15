const Post = require('../models/post.model');

//CREATE
module.exports.create = (req, res) => {
    Post.create(req.body)
    .then((post) => {
        res.status(201).json(post);
    })
    .catch(() => {
        res.status(400).json({message: "Error creating post"});
    });
};

//GET
module.exports.list = (req, res) => {
    const criteria = {};

    if(req.query.author){
        criteria.author = new RegExp(req.query.author, "i");
    }

    Post.find(criteria).then((posts) => {
        res.json(posts);
    })
};

//GET/:id
module.exports.detail = (req, res) => {
    Post.findById(req.params.id).then((post) => {
        if(post){
            res.json(post);            
        } else {
            res.status(404).json({message: "Post not found"});
        }
    });
};


//PATCH
module.exports.update = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).then((post) => {
        if(post){
            res.json(post);
        } else {
            res.status(404).json({message: "Post not found"})
        }
    })
    .catch(() => {
        res.status(400).json({message: "Error updating post"});
    });
};

//DELETE
module.exports.delete = (req, res) => {
    Post.findByIdAndDelete(req.params.id)
    .then((user) => {
        if(user){
            res.status(204).json();
        } else {
            res.status(404).json({message: "Post not found"});
        }
    })
    .catch(() => {
        res.status(400).json({message: "Error deleting post"});
    }) 
};
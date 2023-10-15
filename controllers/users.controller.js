const User = require('../models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
    User.findOne({
        email: req.body.email,
    }).then((user) => {
        if(user){
            bcrypt.compare(req.body.password, user.password).then((match) => {
                if(match && user.active){
                    const token = jwt.sign({ sub: user._id, exp: Date.now() / 1000 + 3600}, "super-secret");
                    res.json({token: token});
                } else {
                    res.status(401).json({message: 'Unauthorized'});
                }
            })
        } else {
            res.status(400).json({message: 'Unauthorized'});
        }
    })
};

module.exports.create = (req, res) => {
    console.log(req.body);   
    
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        req.body.password = hash;
        
        User.create(req.body)
        .then((user) => {
            res.status(201).json(user);
        })  
        .catch((err) => {
            console.log(err);
            res.status(400).json({message: 'Error creating user'});
        })
    })
    // res.json({message: "TODO: create users"});
};

module.exports.list = (req, res) => {
    const criteria = {};

    if(req.query.name){
        criteria.name = new RegExp(req.query.name, "i");
    }

    User.find(criteria).then((users) => {
        res.json(users);
    })
    // res.json({message: "TODO: user list"});
};

module.exports.detail = (req, res) => {
     User.findById(req.params.id).then((user) => {
        if(user){
            res.json(user);
        } else {
            res.status(404).json({message: 'User not found'});
        }
    })
    // res.json({message: "TODO: user detail"})
};

module.exports.update = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    .then((user) => {
        if(user){
            res.json(user);        
        } else {
            res.status(404).json({message: 'User not found'})
        }
    })
    .catch(() => {
        res.status(400).json({message: 'Error updating user'})
    });
    // res.json({message: "TODO: user update"});
};

module.exports.delete = (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then((user) => {
        if(user){
            res.status(204).json();
        } else {
            res.status(404).json({message: 'User not found'})
        }
    })
    // res.json({message: "TODO: user delete"});
};


module.exports.confirm = (req, res) => {
    if(req.query.token){
        const token = req.query.token;
        console.log(token);
        //criteria.token = req.query.token;

        User.findOne({
            _id: token,
        }).then((user) => {
            console.log('Usuario encontrado');

            const userActive = {
                active: true
            };
            if(user){
                //Actualiza active
                User.findByIdAndUpdate(token, userActive, {
                    new: true,
                    runValidators: true,
                })
                .then((user) => {
                    if(user){
                        res.json(user);        
                    } else {
                        res.status(404).json({message: 'User not found'})
                    }
                })
                .catch(() => {
                    res.status(400).json({message: 'Error updating user'})
                });


            } else {
                res.status(404).json({message: 'User not found'});
            }
        })
    } else {
        res.status(400).json({message: 'Unauthorized'});
    }
}
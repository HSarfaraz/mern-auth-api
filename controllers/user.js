//create the user mthod , before import user model
const { UnauthorizedError } = require('express-jwt');
const User = require('../models/user');

exports.read = (req, res) =>{
    const userId = req.params.id;

    //User.findOne({_id:userId}).exec((err,user)=>{
    User.findById(userId).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: 'User is not found'
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};

exports.update = (req, res) =>{
    //console.log('Update User - req.user',req.user, 'update Data', req.body);
    const {name, password} = req.body;

    User.findOne({_id:req.user._id}, (err, user) =>{
       
       //Check user exists
        if(err || !user){
            return res.status(400).json({
                error:'User not found'
            })
        }
        //Make sure a valid credentials
        if(!name){
            return res.status(400).json({
                error: 'Name is required'
            })
        }else{
            //If name is not empty then add to the user object
            user.name = name;
        }

        if(password){
            if(password.length < 6){
                return res.status(400).json({
                    error: 'Password should be 6 charactor long'
                })
            }else{
                user.password = password;    
            }
        }

        user.save((err, updatedUser)=>{
            if(err){
                console.log('User update error',err)
                return res.status(400).json({
                    error: 'User update is failed'
                })
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;
            res.json(updatedUser);
        });


    })
}
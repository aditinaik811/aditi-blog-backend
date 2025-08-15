const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../model/comment');
const checkAuth = require('../middleware/checkAuth')
const jwt = require('jsonwebtoken')

//post new comment 
router.post('/add-comment/:id',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'I am Aditi');
    const name = verify.fullName
    console.log(name)
    const newComment = new Comment({
        _id:new mongoose.Types.ObjectId,
       email:req.body.email,
       commentText:req.body.commentText,
       blogId:req.params.id,
       name:name

    })
    newComment.save()
    .then(result=>{
        res.status(200).json({
            new_Comment : result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})



//get all Comment
router.get('/',(req,res)=>{
    Comment.find()
    .select('_id email commentText blogId timestamp')
    .then(result=>{
        res.status(200).json({
            comments:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})


router.get('/get-comments/:id',(req,res)=>{
    Comment.find({blogId:req.params.id})
    .then(result=>{
        console.log(result)
        res.status(200).json({
            comments:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).josn({
            error:err
        })
    })
})

//delete comment by id
router.delete('/:id',(req,res)=>{
    Comment.deleteOne({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            deletedData:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//count all comments
router.get('/get/count/:blogId',(req,res)=>{
    Comment.find({blogId:req.params.blogId}).countDocuments()
    .then(result=>{
        res.status(200).json({
            total:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})
module.exports = router;
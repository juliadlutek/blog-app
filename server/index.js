import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postsRoutes from './routes/posts.js'
import commentsRoutes from './routes/comments.js'
import usersRoutes from './routes/users.js'
import likesRoutes from './routes/likes.js'


const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    next();
  });

  
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(cors())

app.use('/posts', postsRoutes);
app.use('/comments',commentsRoutes);
app.use('/users',usersRoutes);
app.use('/likes',likesRoutes);


const CONNECTION_URL = 'mongodb+srv://julia:8H7PC6NonTXhYlPo@cluster0.0ejqw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
    .catch((error) => console.log(error.message))
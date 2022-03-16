import express from 'express';
import bodyParser from 'body-parser';

import { getAllPosts, getPost, createPost, deletePost, editPost, getPostByPattern } from '../controllers/posts.js'

const router = express.Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', getAllPosts);
router.get('/:id', getPost);
router.post('/search', urlencodedParser, getPostByPattern);
router.post('/', urlencodedParser, createPost);
router.delete('/:id', deletePost);
router.put('/', urlencodedParser, editPost);


export default router 
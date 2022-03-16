import express from 'express';
import bodyParser from 'body-parser';

import { getAllComments, getComment, createComment, deleteComment, editComment } from '../controllers/comments.js'

const router = express.Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', getAllComments);
router.get('/:id', getComment);
router.post('/', urlencodedParser, createComment);
router.delete('/:id', deleteComment);
router.put('/', urlencodedParser, editComment);

export default router 
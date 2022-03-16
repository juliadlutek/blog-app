import express from 'express';
import bodyParser from 'body-parser';

import { getAllLikes, createLike, deleteLike, like, dislike } from '../controllers/likes.js'

const router = express.Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', getAllLikes);
router.post('/', urlencodedParser, createLike);
router.delete('/:id', deleteLike);
router.put('/like', urlencodedParser, like);
router.put('/dislike', urlencodedParser, dislike);


export default router 
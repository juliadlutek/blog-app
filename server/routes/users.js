import express from 'express';
import bodyParser from 'body-parser';

import { login, register, getAllUsers, getUser, editUser, deleteUser } from '../controllers/users.js'

const router = express.Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post('/login', login)
router.post('/register', register)
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/', urlencodedParser, editUser);
router.delete('/:id', deleteUser);

export default router 
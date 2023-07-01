const express = require('express');
const{getAllQuestions} = require('../Controllers/questions');

const router = express.Router();


router
.route('/')
.get(getAllQuestions);


module.exports = router;
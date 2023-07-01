const express = require('express');
const{getAllQuestions, getQuestion,createQuestion,deleteQuestion} = require('../Controllers/questions');
const{createOptions} = require('../Controllers/options');
const validator = require('../middleware/validator');

const router = express.Router();


router
.route('/')
.get(getAllQuestions);

router
.route('/:id')
.get(getQuestion);

router
.route('/:id/options/create')
.post(createOptions);

router
.route('/create')
.post(validator.questionValidator , createQuestion);

router
.route('/:id/delete')
.delete(deleteQuestion);

module.exports = router;
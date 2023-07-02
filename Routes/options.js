const express = require('express');
const{createOptions,deleteOption,addVote} = require('../Controllers/options');
const validator = require('../middleware/validator');

const router = express.Router();

router
.route('/:id/delete')
.delete(deleteOption);

router
.route('/:id/add_vote')
.post(addVote);


module.exports = router;
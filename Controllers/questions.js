const Question = require('../Models/Question');
const Option = require('../Models/Option');
const {validationResult} = require('express-validator');



//@desc Get all Questions 
//@route GET /api/v1/questions
//@access Public
exports.getAllQuestions = async(req,res)=>{
 
    const question = await Question.find({}).populate('options');
    if(question.length>0){
        return res.json(200,{
            message:'List of questions',
            questions:question,
            count:question.length
        });
    }

return res.json(200,{
    message:'No questions were found!!'
});
};

//@desc Create Question with options and all the votes to it.
//@route POST /api/v1/questions/create
//@access Public
module.exports.createQuestion = async function(req,res){
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});      
    }

    try {
        let questions = await Question.create({
            title: req.body.title,
            vote:false,
        });
        if(questions){
            return res.json(200, {
                message: 'Question created successfully!',
                question: questions
            });
        }else{
            return res.json(400, {
                message: 'Question creation failed'
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error
        });
    }
}


//@desc Geta single Question with options and all the votes to it.
//@route GET /api/v1/questions/:id
//@access Public
module.exports.getQuestion = async function(req,res){
    const question = await Question.findById(req.params.id).populate('options');
    if(question){
        return res.json(200, {
            message: 'Question found!',
            question: question
        });
    }else{
        return res.json(400, {
            message: 'Question not found!'
        });
    }
}


//@desc Delete a Question 
//@route Delete /api/v1/questions/create
//@access Public
module.exports.deleteQuestion = async function(req, res){
    console.log(req.params.id);
    const findQuestion = await Question.findById(req.params.id);
    
    if(findQuestion){
        console.log(findQuestion);
        if(findQuestion.vote!=true){
            let deleteQuestion = await Question.findByIdAndDelete(req.params.id);
            let deleteOptions = await Option.deleteMany({question: req.params.id});    
            if(deleteQuestion && deleteOptions){
                    
                    
                    return res.json(200, {
                        message: 'Question deleted successfully!'
                    });
                }else{
                    return res.json(400, {
                        message: 'Question deletion failed'
                    });
                }
        }else{
            return res.json(201, {
                message: 'Question already voted!So it can\'t be deleted!'
            });
        }
    }else{
        return res.json(400, {
            message: 'Question not found!'
        });
    }
    

}
const Question = require('../Models/Question');
const Qption = require('../Models/Option');



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
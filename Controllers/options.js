const Question = require('../Models/Question');
const Option = require('../Models/Option');
const {validationResult} = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

//@desc Create Options for a specific question
//@route POST /api/v1/questions/:id/options/create
//@access Public
module.exports.createOptions = async function(req,res){

    let questionId = req.params.id;
    let question = await Question.findById(questionId);

    
    if(question){
        const id = question.options.length + 1;
       //console.log('Inside if statement', question);

        let option = await Option.create({
            option_num: id,
            question: questionId,
            content: req.body.content,
            votes: 0,
            
        });

        let optionsSave = await option.save();

        if(optionsSave){
            let optionId = option._id;
            let updateOptionLink = await Option.updateOne({_id: optionId}, {$set: {link: `${process.env.url}/api/v1/options/${optionId}/add_vote`}});
            
            question.options.push(option);
            question.save();
            return res.json(200, {
                message: 'Option created successfully!',
                option: option    
            });
        }else{
            return res.json(400, {
                message: 'Option creation failed',
                error :err
            });
        }

        
    }else{
        return res.json(400, {
            message: 'Option creation failed'
        });
    }

};


//@desc Delete an Option 
//@route Delete /api/v1/options/:id/delete
//@access Public
module.exports.deleteOption = async function(req,res){
    let optionID = req.params.id;
    const option = await Option.findById(optionID);
    if(option){
            let questionID = option.question;
            console.log(`question id is ${questionID}`);
            if(option.votes!=0){
                return res.json(400, {
                    message: 'Option cannot be deleted as it has recieved a vote !'
                });
            }
            const deleteValue = await Question.updateOne({_id: questionID}, {$pull: {options: optionID}});   
            if(deleteValue){
                await Option.deleteOne({_id: optionID});

                return res.json(200, {
                    message: 'Option deleted successfully!'
                });
            }else{
                return res.json(400, {
                    message: 'Option deletion failed'
                });
            }
        }else{
            return res.json(400, {
                message: 'Option Id does not exists'
            });
        }
};

//@desc Add a vote to an Option of a Question
//@route POST /api/v1/options/:id/add_vote
//@access Public
module.exports.addVote = async function(req,res){
    let optionID = req.params.id;
    let option = await Option.findById(optionID);
    const addVote = await Option.updateOne({_id: optionID}, {$inc: {votes: 1}});
    if(addVote && option){
        let questionID = option.question;
        const question = await Question.updateOne({_id: questionID}, {$set: {vote:true}});
        if(question){
            return res.json(200, {
                message: 'Vote added successfully!'
            });
        }else{
            return res.json(400, {
                message: 'Vote addition failed'
            });
        }
        
    }else{
        return res.json(400, {
            message: 'Vote addition failed'
        });
    }
}

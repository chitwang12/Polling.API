# Polling.API
API for Polling Questions - Coding Ninjas Backend Skill Test Project

TASK : 
        Need to create an API where anyone can create questions with options and also add votes to it .


## Features
- Create a question
- Add options to a question
- Add a vote to an option of question
- Delete a question → (optional: A question can’t be deleted if one of it’s options has votes)
- Delete an option → (optional: An option can’t be deleted if it has even one vote given to it)
- View a question with it’s options and all the votes given to it

## Required Routes
- /api/v1/questions  (To view all Questions along with options and votes)
- /api/v1/questions/:id (To view a single question and it’s options)
- /api/v1/questions/create (To create a question)
- /api/v1/questions/:id/delete (To delete a question)
- /api/v1/questions/:id/options/create (To add options to a specific question)
- /api/v1/options/:id/delete (To delete an option)
- /api/v1/options/:id/add_vote (To increment the count of votes)


## STEPS TO SET UP THE APP TO RUN  
1.Just Clone the git repo.
2.After cloning the repo run npm install to install all the dependencies.
3.run npm run dev -> to run the application on your machine 
4.The app must have been starting running on your machine , you can now test the routes mentioned above on postman .

## ROUTE FOR POSTMAN TESTING
## Base route for testing goes like :  http://localhost:5500 , You can embed the particular routes mentioned above as depending upon the functionality you want. 

## Folder Structure 
  POLLING.API/
├── Controllers/
│   ├── options.js
│   ├── questions.js
|   |
├── routes/
│   ├── options.js
│   ├── questions.js
|   |
├── models/
│   ├── Option.js
│   ├── Question.js
|   |
├── Config/
│   ├── db.js
├──|
├── middleware/
│   ├── validator.js
|   |
├── Index.js
├── package-lock.json
├── package.json
├── README.md


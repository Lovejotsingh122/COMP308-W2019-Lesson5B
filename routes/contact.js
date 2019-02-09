let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the db schema
let contactModel = require('../models/contact');

/* GET Contact List page - READ Operation */
router.get('/', (req, res, next) =>{
    contactModel.find((err, contactList) => {
        if(err) {
            return console.error(err);
        }
        else {
           // console.log(contactList);

            res.render('contacts/index', {
                title: 'Contact List',
                contactList: contactList
            });
            
        }
    });
});
//get route for the add page 
// this will display the add page
router.get('/add',(req,res,next)=>{
    res.render('contacts/add',{
        title:'Add New Contact'
    });
});



router.post('/add',(req,res,next)=>{
let newContact=contctModel({
    "firstName":req.body.firstName,
    "lastName":req.body.lastName,
    "age":req.body.age

});

contactModel.create(newContact,(err,contactModel)=>{
    if(err){
        console.log(err);
        res.end(err);
    }
    else{ 
         res.redirect('/contactList');
    }
});
});
module.exports = router;
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const connection  = require('../config/db');

router.get('/', function(req, res, next) {      
    connection.query('SELECT * FROM customer ORDER BY id desc',function(err,rows) {
        if(err){
            req.flash('error', err); 
            res.render('customers',{page_title:"Customers - Node.js",data:''});   
        } else {            
            res.render('customers',{page_title:"Customers - Node.js",data:rows});
        }                        
    });
});

router.get('/add', function(req, res, next){    
    res.render('customers/add', {
        title: 'Add New Customers',
        name: '',
        email: ''        
    })
})

router.post('/add', [
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'Invalid email.').isEmail()
], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        let errMsg = ''
        errors.errors.forEach((e) => {
            errMsg += `${e.msg} <br />`
        })
        req.flash('error', errMsg)  
        res.render('customers/add', { 
            title: 'Add New Customer',
            name: req.body.name,
            email: req.body.email
        })
    } else {
        const user = {
            name: req.body.name,
            email: req.body.email
        }
        connection.query('INSERT INTO customer SET ?', user, function(err, result) {
            if (err) {
                req.flash('error', err)
                res.render('customers/add', {
                    title: 'Add New Customer',
                    name: user.name,
                    email: user.email
                })
            } else {                
                req.flash('success', 'Data added successfully!');
                res.redirect('/customers');
            }
        })
    }
})

router.get('/edit/(:id)', function(req, res, next){
    connection.query('SELECT * FROM customer WHERE id = ' + req.params.id, function(err, rows, fields) {
        if(err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'Customers not found id: ' + req.params.id)
            res.redirect('/customers')
        } else {
            res.render('customers/edit', {
                title: 'Edit Customer',
                id: rows[0].id,
                name: rows[0].name,
                email: rows[0].email                    
            })
        }            
    })
})

router.post('/update/:id', [
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'Invalid email.').isEmail()
], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        let errMsg = ''
        errors.errors.forEach((e) => {
            errMsg += `${e.msg} <br />`
        })
        req.flash('error', errMsg)  
        res.render('customers/edit', { 
            title: 'Edit Customer',
            id: req.params.id,
            name: req.body.name,
            email: req.body.email
        })
    } else {
        const user = {
            name: req.body.name,
            email: req.body.email
        }
        connection.query('UPDATE customer SET ? WHERE id = ' + req.params.id, user, function(err, result) {
            if (err) {
                req.flash('error', err)
                res.render('customers/edit', {
                    title: 'Edit Customer',
                    id: req.params.id,
                    name: req.body.name,
                    email: req.body.email
                })
            } else {
                req.flash('success', 'Data updated');
                res.redirect('/customers');
            }
        })
    }
})

router.get('/delete/(:id)', function(req, res, next) {
    const user = { id: req.params.id }   
    connection.query('DELETE FROM customer WHERE id = ' + req.params.id, user, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('/customers')
        } else {
            req.flash('success', 'Deleted success id: ' + req.params.id)
            res.redirect('/customers')
        }
    })
})
 
module.exports = router;
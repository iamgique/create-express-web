const { validationResult } = require('express-validator');
const store = require('../store/customers.store');

class CustomersController {
    static async get_customer(req, res) {
        try {
            const rows = await store.get_all_customer()
            res.render('customers/',{
                title: "Customers - Node.js",
                data: rows
            });
        } catch (err) {
            req.flash('error', err); 
            res.render('customers',{
                title: "Customers - Node.js",
                data: ''
            });
        }
    }

    static async get_add_customer(req, res) {
        res.render('customers/add', {
            title: 'Add New Customers',
            name: '',
            email: ''
        })
    }

    static async post_add_customer(req, res, next) {
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
            try {
                await store.add_customer(user)
                req.flash('success', 'Data added');
                res.redirect('/customers');
            } catch (err) {
                req.flash('error', err)
                res.render('customers/add', {
                    title: 'Add New Customer',
                    name: user.name,
                    email: user.email
                })
            }
        }
    }

    static async get_edit_customer(req, res, next) {
        try {
            const rows = await store.get_customer_by_id(req)
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
        } catch (err) {
            req.flash('error', 'Customers not found id: ' + req.params.id)
            res.redirect('/customers')
        }
    }

    static async post_update_customer(req, res, next){
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
                id: req.params.id,
                name: req.body.name,
                email: req.body.email
            }
            try {
                await store.update_customer(user)
                req.flash('success', 'Data updated');
                res.redirect('/customers');
            } catch (err) {
                req.flash('error', err)
                res.render('customers/edit', {
                    title: 'Edit Customer',
                    id: req.params.id,
                    name: req.body.name,
                    email: req.body.email
                })
            }
        }
    }

    static async delete_customer(req, res, next) {
        const user = { id: req.params.id }
        try {
            await store.delete_customer(user)
            req.flash('success', 'Deleted success id: ' + req.params.id)
            res.redirect('/customers')
        } catch (err) {
            req.flash('error', err)
            res.redirect('/customers')
        }
    }
}

module.exports = CustomersController;
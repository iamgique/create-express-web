const express = require('express');
const router = express.Router();
const customer  = require('../controllers/customers.controller');
const validate  = require('../util/validate');

router.get('/', customer.get_customer);
router.route('/add')
    .get(customer.get_add_customer)
    .post(validate, customer.post_add_customer);
router.get('/edit/:id', customer.get_edit_customer);
router.post('/update/:id', validate, customer.post_update_customer);
router.get('/delete/:id', customer.delete_customer);
 
router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;
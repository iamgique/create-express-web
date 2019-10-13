const connection  = require('../config/db');

class CustomerStore {
    static async get_all_customer(res){
        try {
            const rows = await connection.query('SELECT * FROM customer ORDER BY id desc')
            return rows[0]
        } catch (err) {
            return err.response
        }
    }

    static async add_customer(req, res){
        try {
            return await connection.query('INSERT INTO customer SET ?', req)
        } catch (err) {
            return err.response
        }
    }

    static async get_customer_by_id(req, res){
        try {
            const rows = await connection.query('SELECT * FROM customer WHERE id = ' + req.params.id)
            return rows[0]
        } catch (err) {
            return err.response
        }
    }

    static async update_customer(req, res){
        try {
            return await connection.query('UPDATE customer SET ? WHERE id = ' + req.id, req)
        } catch (err) {
            return err.response
        }
    }

    static async delete_customer(req, res){
        try {
            return await connection.query('DELETE FROM customer WHERE id = ' + req.id, req)
        } catch (err) {
            return err.response
        }
    }
}

module.exports = CustomerStore;
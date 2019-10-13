const connection  = require('../config/db');

class CustomerStore {
    static async get_all_customer(res){
        try {
            const rows = await connection.query('SELECT * FROM customer ORDER BY id desc')
            return rows[0]
        } catch (err) {
            console.log(err.message)
            throw err.message
        }
    }

    static async add_customer(req, res){
        try {
            return await connection.query('INSERT INTO customer SET ?', req)
        } catch (err) {
            throw err.message
        }
    }

    static async get_customer_by_id(req, res){
        try {
            const rows = await connection.query('SELECT * FROM customer WHERE id = ' + req.params.id)
            return rows[0]
        } catch (err) {
            throw err.message
        }
    }

    static async update_customer(req, res){
        try {
            return await connection.query('UPDATE customer SET ? WHERE id = ' + req.id, req)
        } catch (err) {
            throw err.message
        }
    }

    static async delete_customer(req, res){
        try {
            return await connection.query('DELETE FROM customer WHERE id = ' + req.id, req)
        } catch (err) {
            throw err.message
        }
    }
}

module.exports = CustomerStore;
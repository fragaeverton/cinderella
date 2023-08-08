const Pool = require('pg').Pool;
require('dotenv').config();


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
})


const getAllProducts = (request, response) => {
    pool.query("SELECT p.id, b.name, p.model, p.type, s.size, pr.price, s.qty FROM clt_products p, clt_prices pr, clt_stock s, clt_brands b WHERE p.brand_id = b.id and p.id = pr.product_id and p.id = s.product_id and b.state = 'Active' and s.state = 'Active' and p.state = 'Active' ORDER BY p.id ASC", (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { firstname, surname, email, password, phone, address, postcode } = request.body
    pool.query(`CALL cltp_create_customer( $1, $2, $3, $4, $5, $6, $7, null);`, [ firstname, surname, email, password, phone, address, postcode] , (error, results) => {
        if(request.body.email == undefined){
            response.status(500).send({message : error.name})
        }else if (error) {
            throw error
        }else{
            response.status(201).send(results.rows)
        }
    })
}


const createUserAddress = (request, response) => {
    const { user_id, address, postcode } = request.body
    pool.query(`CALL cltp_create_customer_address( $1, $2, $3, null);`, [ user_id, address, postcode] , (error, results) => {
        if(request.body.user_id == undefined){
            response.status(500).send({message : error.name})
        }else if (error) {
            throw error
        }else{
            response.status(201).send(results.rows)
        }
    })
}


const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { password, state, firstname, surname, phone } = request.body
    pool.query(`CALL cltp_update_customer( $1, $2, '', $3, $4, $5, $6, null);`, [ id, password, state, firstname, surname, phone] , (error, results) => {
        if(id == undefined){
            response.status(500).send({message : error.name})
        }else if (error) {
            throw error
        }else{
            response.status(200).send(results.rows)
        }
    })
}

const deleteRow = (request, response) => {
    const id = parseInt(request.params.id);
    const target = request.baseUrl;
    pool.query(`CALL cltp_delete( $1, $2, null);`, [id, target] , (error, results) => {
        if(id == undefined){
            response.status(500).send({message : error.name})
        }else if (error) {
            throw error
        }else{
            response.status(200).send(results.rows)
        }
    })
}

module.exports = {
    getAllProducts,
    createUser,
    createUserAddress,
    updateUser,
    deleteRow
};
const {pool} = require("./db.js")
const bcrypt = require("bcryptjs")
//const passport = require('passport');

const getAllProducts = (request, response) => {
    pool.query("SELECT p.id, b.name, p.model, p.type, s.size, pr.price, s.qty, p.img FROM clt_products p, clt_prices pr, clt_stock s, clt_brands b WHERE p.brand_id = b.id and p.id = pr.product_id and p.id = s.product_id and b.state = 'Active' and s.state = 'Active' and p.state = 'Active' ORDER BY p.id ASC", (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getProduct = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query("SELECT p.id, b.name, p.model, p.type, s.size, pr.price, s.qty, p.img FROM clt_products p, clt_prices pr, clt_stock s, clt_brands b WHERE p.brand_id = b.id and p.id = pr.product_id and p.id = s.product_id and b.state = 'Active' and s.state = 'Active' and p.state = 'Active' and p.id = $1", [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getProductTypes = (request, response) => {
    pool.query("SELECT distinct(type) AS type FROM clt_products WHERE state = 'Active' ORDER BY type;", (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}


const createProduct = (request, response) => {
    const { brand_id, model, type } = request.body
    pool.query(`CALL cltp_create_products($1, $2, $3, null)`, [ brand_id, model, type] , (error, results) => {
        if(request.body.brand_id == undefined){
            response.status(500).send({message : error.name})
        }else if (error) {
            throw error
        }else{
            response.status(201).send(results.rows)
        }
    })
}

const updateProduct = async (request, response) => {    
    const id = parseInt(request.params.id)
    const { model, type } = request.body
    pool.query(`UPDATE clt_products SET model = $2, type = $3 WHERE id = $1 RETURNING *`, [ id, model, type] , (error, results) => {
        if(id == undefined){
            response.status(500).send({message : error.name})
        }else if (error) {
            throw error
        }else{
            response.status(200).send(results.rows)
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
    getProduct,
    createProduct,
    updateProduct,
    createUserAddress,
    deleteRow,
    getProductTypes
};
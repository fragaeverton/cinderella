const {client} = require("./db.js")
const bcrypt = require("bcryptjs")

const emailExists = async (email) => {
    const data = await client.query("SELECT * FROM clt_users WHERE email=$1", [
      email,
    ]);
   
    if (data.rowCount == 0) return false; 
    return data.rows[0];
};

const findById = async (id) => {
    const data = await client.query("SELECT * FROM clt_users WHERE id=$1", [
        id,
    ]);
   
    if (data.rowCount == 0) return false; 
    return data.rows[0];
};

const matchPassword = async (password, hashPassword) => {
    const match = await bcrypt.compare(password, hashPassword);
    return match;
};

const updateToken = async (email, tkn) => {
 
  const data = await client.query(
    "UPDATE clt_users VALUES set token = $2 WHERE email = $1 RETURNING token",
    [email, tkn]
  );
 
  if (data.rowCount == 0) return false;
  return data.rows[0];
};

const createUser = async (email, password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
   
    const data = await client.query(
      "INSERT INTO clt_users(email, password, state) VALUES ($1, $2, 'Active') RETURNING id, email, password",
      [email, hash]
    );
   
    if (data.rowCount == 0) return false;
    return data.rows[0];
};
const updatePassword = async (email, password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
   
    const data = await client.query(
      "UPDATE clt_users VALUES set password = $2 WHERE email = $1 RETURNING id",
      [email, hash]
    );
   
    if (data.rowCount == 0) return false;
    return data.rows[0];
};

const deleteUser = async (email) => {
   const data = await client.query(
    "UPDATE clt_users VALUES set state = 'Inactive' WHERE email = $1 RETURNING id",
    [email]
  );
 
  if (data.rowCount == 0) return false;
  return data.rows[0];
};


module.exports = { emailExists, matchPassword, createUser, findById, updatePassword, deleteUser, updateToken};
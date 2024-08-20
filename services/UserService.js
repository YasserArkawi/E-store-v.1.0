const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

class UserService {
  static async getUserById(id) {
    try {
      const result = new Promise((resolve, reject) => {
        const query = "SELECT * FROM user WHERE user_id = ?";
        connection.query(query, [+id], (err, result) => {
          if (err) reject(new Error(err));
          resolve(result[0]);
        });
      });
      return result;
    } catch (error) {}
  }

  static async registerUser(data) {
    try {
      // const user_id = data.user_id;
      const f_name = data.f_name;
      const image = data.image;
      const email = data.email;
      const password = data.password;
      data.phone.toString();
      const phone = data.phone;
      // phone.toString();
      console.log(phone);
      const is_admin = data.is_admin;
      const result = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO user (f_name,image,email,password,phone,is_admin) VALUES (?,?,?,?,?,?)";
        connection.query(
          query,
          [f_name, image, email, password, phone, is_admin],
          (err, result) => {
            if (err) reject(Error(err));
            resolve(result);
          }
        );
      });
      return result;
    } catch (error) {}
  }

  static async loginUser(data) {
    try {
      const email = data.email;
      const password = data.password;
      let erro = new Error();
      const result = new Promise((resolve, reject) => {
        const query = "SELECT * FROM user WHERE email = ?";
        connection.query(query, [email], (err, result) => {
          console.log(result);
          if (err || result.length === 0 || result[0].is_admin === 1) {
            erro = new Error("Email Not Found");
            reject(erro);
          } else {
            if (result[0].password === password) {
              resolve(result[0]);
            } else {
              erro = new Error("Invalid Password");
              reject(erro);
            }
          }
        });
      });
      return result;
    } catch (error) {}
  }

  static async managerLogin(data) {
    try {
      const email = data.email;
      const password = data.password;
      let erro = new Error();
      const result = new Promise((resolve, reject) => {
        const query = "SELECT * FROM user WHERE email = ?";
        connection.query(query, [email], (err, result) => {
          if (err || result.length === 0) {
            erro = new Error("Email Not Found");
            reject(erro);
          } else if (result[0].is_admin === 0) {
            erro = new Error("Access not allowed");
            reject(erro);
          } else {
            if (result[0].password === password) {
              resolve(result[0]);
            } else {
              erro = new Error("Invalid Password");
              reject(erro);
            }
          }
        });
      });
      return result;
    } catch (error) {}
  }
}

module.exports = UserService;

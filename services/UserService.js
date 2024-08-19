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
        const query = "SELECT * FROM user WHERE id = ?";
        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err));
          resolve(result);
        });
      });
      return result;
    } catch (error) {}
  }

  static async registerUser1(data) {
    try {
      // const user_id = data.user_id;
      const f_name = data.f_name;
      const image = data.image;
      const email = data.email;
      const password = data.password;
      const phone = data.phone;
      const is_admin = data.is_admin;
      const result = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO user (f_name,image,email,password,phone,is_admin) VALUES (?,?,?,?,?,?)";
        connection.query(
          query,
          [f_name, image, email, password, phone, is_admin],
          (err, result) => {
            // console.log(result)
            // console.log(err)
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
      const result = new Promise((resolve, reject) => {
        const query = "SELECT * FROM user WHERE email = ?";
        connection.query(query, [email], (err, result) => {
          console.log(err);
          if (
            err ||
            result[0].is_admin === true ||
            result[0].email !== email.toString()
          ) {
            reject(new Error("Email Not Found"));
          }
          if (result[0].password === password) {
            resolve(result[0]);
          } else {
            reject(new Error("Invalid Password"));
          }
        });
      });
      return result;
    } catch (error) {}
  }
}

module.exports = UserService;

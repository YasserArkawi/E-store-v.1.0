const mysql = require("mysql2");

const connection = mysql.createConnection({
    user:process.env.USER,
    host:process.env.HOST,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.DB_PORT,
})

class CategoryService {

    static async getAllCategories () {
        try {
            const results = new Promise((resolve,reject) => {
                const query = "SELECT * FROM category";
                connection.query(query,[],(err, result)=>{
                    if(err) reject(new Error(err));
                    resolve(result);
                })
            });
            return {
                data:results,
                status:200
            };
        } catch (error) {
            return {
                data: error.message,
                status:400
            };
        }
    }

    static async getCategoryById(id){
        try {
            const result = new Promise((resolve,reject) => {
                const query = "SELECT * FROM category WHERE category_id = ?";
                connection.query(query,[+id],(err, result)=>{
                    if(err) reject(new Error(err));
                    resolve(result);
                })
            });
            return {
                data:result,
                status:200
            };
        } catch (error) {
            return {
                data: error.message,
                status:400
            };
        }
    }
    
    static async addCategory(data){
        try {
            const id = data.id;
            const title = data.title;
            const result = new Promise((resolve,reject) => {
                const query = "INSERT INTO category (category_id,title) VALUES (?,?)";
                connection.query(query,[+id, title],(err, result)=>{
                    if(err) reject(new Error(err));
                    resolve(result);
                })
            });
            return {
                data:result,
                status:201
            };
        } catch (error) {
            return {
                data: error.message,
                status:400
            };
        }
    }

    static async editCategory(data){
        try {
            const id = data.id;
            const title = data.title;
            const result = new Promise((resolve,reject) => {
                const query = "UPDATE category SET title = ? WHERE category_id = ?";
                connection.query(query,[title, +id],(err, result)=>{
                    if(err) reject(new Error(err));
                    resolve(result);
                })
            });
            return {
                data:"updated",
                status:201
            };
        } catch (error) {
            return {
                data: error.message,
                status:400
            };
        }
    }










};
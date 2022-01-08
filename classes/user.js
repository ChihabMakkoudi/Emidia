let conn = require('../config/dbconn')

class User{
    get idUser(){return this.row.id}
    get username(){return this.row.id}
    
    static GetUser(id, cb){
        conn.query('SELECT * FROM user where idUser = ?',[id] , (error, results, fields)=>{
            if (error) throw error;
            cb(new User(results[0]));
        });
    }
    constructor(user){
        this.idUser=user.idUser
        this.username=user.username
        this.password=user.password
        this.email=user.email
    }
    static AddUser(username,password, cb){
        conn.query('INSERT INTO user SET username = ?, Password = ?', [username,password], (error, results, fields)=>{
            if (error) throw error;
            cb(results);
        });
    }
    static GetUsers(cb){
        conn.query('SELECT * FROM user', (error, results, fields)=>{
            if (error) throw error;
            cb(results);
        });
    }
    static GetConnected(username,passeword,cb){
        conn.query('SELECT count(*) as isconnected FROM user where username = ? AND Password = ?', [username,passeword], (error, results, fields)=>{
            if (error) throw error;
            console.log(results[0]);
            cb(results[0]);
        });
    }
}
 
module.exports = User